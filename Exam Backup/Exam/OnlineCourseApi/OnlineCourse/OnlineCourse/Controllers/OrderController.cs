using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;  //For CORS Any Client Can Access Our API
using System.Data;           //For DataBase Operation
using System.Data.SqlClient; //For SQL DataBase Operation   
using System.Configuration;  //For Accessing the Web.Config Configuration Like Connection String
using OnlineCourse.Models;  //For Accessing Our Models i.e Porperties Of Table's Column    
using OnlineCourse.Helper;

namespace OnlineCourse.Controllers
{

    public class OrderController : ApiController
    {
        //Getting the connection string
        SqlConnection conn = DBContext.GetConnection();

        [HttpGet]
        [Route("api/order/checkStock/{userId}")]
        public List<object> ChecStock(int userId)
        {
            List<object> list = new List<object>();
            List<Cart> cartList = new List<Cart>();


            // 1. Get Cart
            #region
            using (conn)
            {
                conn.Open();

                string cartQuery = "SELECT * FROM Cart WHERE UserID=@uid";
                SqlCommand cart = new SqlCommand(cartQuery, conn);
                cart.Parameters.AddWithValue("@uid", userId);

                SqlDataReader rdr = cart.ExecuteReader();

                while (rdr.Read())
                {
                    cartList.Add(new Cart
                    {
                        ProdID = (int)rdr["ProdID"],
                        CartQty = (int)rdr["CartQty"],
                        Price = (int)rdr["Price"]
                    });
                }

                rdr.Close();

                if (cartList.Count == 0)
                {
                    list.Add(new
                    {
                        Message = "Your Cart Is Empty!!!!",
                        IsAvailable = false
                    });
                    return list;
                }
                #endregion


                // 2. CHECK SEAT AVAILABILITY
                #region
                foreach (var item in cartList)
                {
                    string stockQuery = "SELECT ProdName, ProdQty FROM ProductTable WHERE ProdID=@pid";
                    SqlCommand stockCm = new SqlCommand(stockQuery, conn);
                    stockCm.Parameters.AddWithValue("@pid", item.ProdID);

                    SqlDataReader stockRdr = stockCm.ExecuteReader();

                    if (stockRdr.Read())
                    {
                        string name = stockRdr["ProdName"].ToString();
                        int stock = (int)stockRdr["ProdQty"] - 1;

                        if (item.CartQty > stock)
                        {
                            stockRdr.Close();
                            string message = name + " has " + stock + " seats available!";
                            list.Add(new
                            {
                                Message = message,
                                IsAvailable = false
                            });
                            return list;
                        }
                    }
                    stockRdr.Close();
                }

                list.Add(new
                {
                    Message = "Seats Are Available For Your Selected Courses!!!",
                    IsAvailable = true
                });
                #endregion

                return list;
            }

        }

        [HttpGet]
        [Route("api/order/latestBill/{userId}")]
        public List<object> GetOrders(int userId)
        {
            List<object> list = new List<object>();

            try
            {
                using (conn)
                {
                    conn.Open();

                    // Check if admin
                    #region
                    string typeQuery = "SELECT TypeId FROM UserDetails WHERE UserID=@uid";
                    SqlCommand typeCmd = new SqlCommand(typeQuery, conn);
                    typeCmd.Parameters.AddWithValue("@uid", userId);

                    int typeId = Convert.ToInt32(typeCmd.ExecuteScalar());

                    // Admin = 1 
                    bool isAdmin = (typeId == 1);
                    #endregion

                    // Query Bills - If Admin then Select All the BillID 
                    #region
                    string billQuery = isAdmin
                        ? "SELECT BillID, UserID FROM Bill"
                        : @"SELECT TOP 1 BillID, UserID 
                    FROM Bill 
                    WHERE UserID=@uid 
                    ORDER BY BillID DESC";

                    SqlCommand billCmd = new SqlCommand(billQuery, conn);
                    #endregion

                    // If Not Admin Only selecting the Particular User Bill Id 
                    #region
                    if (!isAdmin)
                        billCmd.Parameters.AddWithValue("@uid", userId);

                    SqlDataReader billRdr = billCmd.ExecuteReader();

                    List<Bill> bills = new List<Bill>();

                    while (billRdr.Read())
                    {
                        bills.Add(new Bill
                        {
                            BillID = (int)billRdr["BillID"],
                            UserID = (int)billRdr["UserID"]

                        });
                    }
                    #endregion

                    billRdr.Close();

                    // Loop each bill
                    #region
                    foreach (var b in bills)
                    {
                        int totalQty = 0;
                        int totalAmount = 0;

                        // Get totals
                        #region
                        string detailQuery = @"SELECT BillQty, BillAmt 
                                       FROM BillDetails 
                                       WHERE BillID=@bid";

                        SqlCommand detailCmd = new SqlCommand(detailQuery, conn);
                        detailCmd.Parameters.AddWithValue("@bid", b.BillID);

                        SqlDataReader dr = detailCmd.ExecuteReader();

                        while (dr.Read())
                        {
                            totalQty += (int)dr["BillQty"];
                            totalAmount += (int)dr["BillAmt"];
                        }
                        #endregion

                        dr.Close();

                        // Get username
                        #region
                        string userQuery = "SELECT UserName FROM UserDetails WHERE UserID=@uid";

                        SqlCommand userCmd = new SqlCommand(userQuery, conn);
                        userCmd.Parameters.AddWithValue("@uid", b.UserID);

                        string name = userCmd.ExecuteScalar().ToString();
                        #endregion

                        list.Add(new
                        {
                            Id = b.BillID,
                            Name = name,
                            Tqty = totalQty,
                            Tamt = totalAmount
                        });
                    }
                    #endregion
                }

                return list;
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write(ex.Message);
                list.Clear();
                return list;
            }
        }

        //Getting the Latest Bill Details For Admin As Well As User 
        #region
        //[HttpGet]
        //[Route("api/order/latestBill/{userId}")]
        //public List<object> GetCart(int userId)
        //{
        //    List<object> list = new List<object>();

        //    try
        //    {
        //        using (conn)
        //        {

        //            conn.Open();

        //            // 1. Get Latest BillID
        //            string billQuery = @"SELECT TOP 1 BillID 
        //                     FROM Bill 
        //                     WHERE UserID=@uid 
        //                     ORDER BY BillID DESC";

        //            SqlCommand billCmd = new SqlCommand(billQuery, conn);
        //            billCmd.Parameters.AddWithValue("@uid", userId);

        //            object result = billCmd.ExecuteScalar();

        //            if (result == null)
        //            {
        //                return list;
        //            }

        //            int billId = Convert.ToInt32(result);


        //            string billDetailsQuery = @"Select BillQty, BillAmt from BillDetails where BillID=@BillID";

        //            SqlCommand billDetailsCmd = new SqlCommand(billDetailsQuery, conn);
        //            billDetailsCmd.Parameters.AddWithValue("@BillID", billId);

        //            SqlDataReader billrdr = billDetailsCmd.ExecuteReader();

        //            int totalQty = 0;
        //            int totalAmount = 0;
        //            while (billrdr.Read())
        //            {
        //                totalQty += (int)billrdr["BillQty"];
        //                totalAmount += (int)billrdr["BillAmt"];
        //            }

        //            billrdr.Close();



        //            // 2. Get User Details With The Help of BillId
        //            string detailQuery = @"
        //SELECT u.UserName, u.UserID
        //FROM Bill b
        //JOIN UserDetails u ON b.UserID = u.UserID
        //WHERE b.BillID=@bid";

        //            SqlCommand cmd = new SqlCommand(detailQuery, conn);
        //            cmd.Parameters.AddWithValue("@bid", billId);

        //            SqlDataReader rdr = cmd.ExecuteReader();

        //            string UserName = "";
        //            int UserID = 0;

        //            if (rdr.Read())
        //            {
        //                UserName = rdr["UserName"].ToString();
        //                UserID = (int)rdr["UserID"];
        //            }

        //            list.Add(new
        //            {
        //                Id = billId,
        //                Name = UserName,
        //                Tqty = totalQty,
        //                Tamt = totalAmount
        //            });
        //        }
        //        return list;
        //    }
        //    catch (Exception ex)
        //    {
        //        HttpContext.Current.Response.Write(ex.Message);
        //        list.Clear();
        //        return list;
        //    }

        //}
        #endregion

        [HttpPost]
        [Route("api/order/checkout/{userId}")]
        public List<object> Checkout(int userId)
        {
            List<object> list = new List<object>();
            List<Cart> cartList = new List<Cart>();

            using (conn)
            {
                conn.Open();

                try
                {
                    // 1. Get Cart
                    #region
                    string cartQuery = "SELECT * FROM Cart WHERE UserID=@uid";
                    SqlCommand cartCmd = new SqlCommand(cartQuery, conn);
                    cartCmd.Parameters.AddWithValue("@uid", userId);

                    SqlDataReader rdr = cartCmd.ExecuteReader();


                    while (rdr.Read())
                    {
                        cartList.Add(new Cart
                        {
                            ProdID = (int)rdr["ProdID"],
                            CartQty = (int)rdr["CartQty"],
                            Price = (int)rdr["Price"]
                        });
                    }

                    rdr.Close();

                    if (cartList.Count == 0)
                    {
                        list.Add(new
                        {
                            Message = "Your Cart Is Empty!!!!",
                            IsAvailable = false
                        });
                        return list;
                    }
                    #endregion

                    // 2. Stock Availability Checking 
                    #region
                    // Which Are Aleready Cheked Before Redirecting to the Payment Page
                    #endregion

                    #region
                    // 3. CREATE BILL
                    string billQuery = "INSERT INTO Bill(UserID) OUTPUT INSERTED.BillID VALUES(@uid)";

                    SqlCommand billCmd = new SqlCommand(billQuery, conn);
                    billCmd.Parameters.AddWithValue("@uid", userId);

                    int billId = (int)billCmd.ExecuteScalar();

                    int totalAmount = 0;
                    #endregion

                    // 4. INSERT DETAILS + UPDATE STOCK
                    #region
                    foreach (var item in cartList)
                    {
                        int amount = item.Price * item.CartQty;
                        totalAmount += amount;

                        // Insert BillDetails
                        #region
                        string detailQuery = @"INSERT INTO BillDetails
                (BillID, ProdID, BillQty, BillAmt)
                VALUES (@bid, @pid, @qty, @amt)";

                        SqlCommand detailCmd = new SqlCommand(detailQuery, conn);
                        detailCmd.Parameters.AddWithValue("@bid", billId);
                        detailCmd.Parameters.AddWithValue("@pid", item.ProdID);
                        detailCmd.Parameters.AddWithValue("@qty", item.CartQty);
                        detailCmd.Parameters.AddWithValue("@amt", amount);

                        detailCmd.ExecuteNonQuery();
                        #endregion

                        // Update Stock
                        #region
                        string updateStock = @"UPDATE ProductTable
                                      SET ProdQty = ProdQty - @qty
                                      WHERE ProdID=@pid";

                        SqlCommand updateCmd = new SqlCommand(updateStock, conn);
                        updateCmd.Parameters.AddWithValue("@qty", item.CartQty);
                        updateCmd.Parameters.AddWithValue("@pid", item.ProdID);

                        updateCmd.ExecuteNonQuery();
                        #endregion
                    }
                    #endregion

                    // 5. CLEAR CART
                    #region
                    string clearCart = "DELETE FROM Cart WHERE UserID=@uid";
                    SqlCommand clearCmd = new SqlCommand(clearCart, conn);
                    clearCmd.Parameters.AddWithValue("@uid", userId);
                    clearCmd.ExecuteNonQuery();


                    list.Add(new
                    {
                        Message = "Bill Generated!!!!",
                        IsPurchase = true,
                        BillId = billId,
                        UserId = userId,
                        TotalAmount = totalAmount
                    });
                    #endregion

                    return list;


                }
                catch (Exception ex)
                {
                    list.Add(new
                    {

                        Message = "Bill Generation is Failed!!!!" + ex.Message,
                        IsAvailable = false
                    });
                    return list;
                }
            }
        }


        [HttpGet]
        [Route("api/order/enrolledCourses/{userId}")]

        public List<ProductTable> GetEnrolledCourses(int userId)
        {
            List<ProductTable> list = new List<ProductTable>();

            try
            {
                using (conn)
                {
                    string query = @"
                                    SELECT DISTINCT
                                    p.ProdID,
                                    p.ProdName,
                                    p.ProdPrice,
                                    p.ProdImg,
                                    p.ProdDsc,
                                    p.ProdQty,
                                    p.categoryId
                                    FROM Bill b
                                    INNER JOIN BillDetails bd
                                    ON b.BillID = bd.BillID
                                    INNER JOIN ProductTable p
                                    ON bd.ProdID = p.ProdID
                                    WHERE b.UserID = @uid";

                    SqlCommand cmd = new SqlCommand(query,conn);

                    cmd.Parameters.AddWithValue("@uid",userId);

                    conn.Open();

                    SqlDataReader rdr =cmd.ExecuteReader();

                    using (rdr)
                    {
                        while (rdr.Read())
                        {
                            ProductTable p = new ProductTable();

                            p.ProdID = (int)rdr[0];

                            p.ProdName = (string)rdr[1];

                            p.ProdPrice = (int)rdr[2];

                            p.ProdImg = (string)rdr[3];

                            p.ProdDsc = (string)rdr[4];

                            p.ProdQty = (int)rdr[5];

                            p.categoryId = (int)rdr[6];

                            list.Add(p);
                        }
                    }
                }
            }

            catch
            {
            }

            return list;
        }

    }
}

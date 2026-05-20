using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    /// <summary>
    /// This Class Having a Api Related to Cart Operations
    /// </summary>
    public class CartController : ApiController
    {

        //Getting the connection string
        SqlConnection conn = DBContext.GetConnection();

        //Getting the user cart details with the help of the user id
        [HttpGet]
        [Route("api/cart/{userId}")]
        public List<object> GetCart(int userId)
        {
            List<object> list = new List<object>();

            #region
            using (conn)
            {

                string query = @"SELECT c.CartID, c.ProdID, c.CartQty, c.Price,
                                 p.ProdName, p.ProdImg, p.ProdDsc
                                 FROM Cart c
                                 JOIN ProductTable p ON c.ProdID = p.ProdID
                                 WHERE c.UserID=@uid";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@uid", userId);

                conn.Open();

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    list.Add(new
                    {
                        CartID = (int)rdr["CartID"],
                        ProdID = (int)rdr["ProdID"],
                        Qty = (int)rdr["CartQty"],
                        Price = (int)rdr["Price"],
                        Name = rdr["ProdName"].ToString(),
                        Image = rdr["ProdImg"].ToString(),
                        Desc = rdr["ProdDsc"].ToString(),
                    });
                }
            }
            #endregion

            return list;
        }

        //Adding the Courses in the cart
        [HttpPost]
        [Route("api/cart/add")]
        public string AddToCart(Cart cart)
        {
            try
            {
                using (conn)
                {
                    conn.Open();

                    // CHECK COURSE ALREADY PURCHASED
                    #region
                    string enrolledQuery = @" SELECT COUNT(*)
                                            FROM Bill b
                                            INNER JOIN BillDetails bd
                                            ON b.BillID = bd.BillID
                                            WHERE
                                            b.UserID = @uid
                                            AND
                                            bd.ProdID = @pid";

                    SqlCommand enrolledCmd = new SqlCommand(enrolledQuery, conn);

                    enrolledCmd.Parameters.AddWithValue("@uid", cart.UserID);
                    enrolledCmd.Parameters.AddWithValue("@pid", cart.ProdID);

                    int enrolledCount = (int)enrolledCmd.ExecuteScalar();

                    if (enrolledCount > 0)
                    {
                        return "You are already enrolled in this course!";
                    }
                    #endregion

                    // CHECK COURSE ALREADY IN CART
                    #region
                    string cartQuery = @"SELECT COUNT(*) FROM Cart WHERE UserID = @uid AND ProdID = @pid";

                    SqlCommand cartCmd = new SqlCommand(cartQuery, conn);

                    cartCmd.Parameters.AddWithValue("@uid",cart.UserID);

                    cartCmd.Parameters.AddWithValue("@pid",cart.ProdID);

                    int cartCount =(int)cartCmd.ExecuteScalar();

                    if (cartCount > 0)
                    {
                        return "Course already added in cart!";
                    }
                    #endregion

                    // INSERT INTO CART
                    #region
                    string insertQuery = @"INSERT INTO Cart(UserID,ProdID,CartQty,Price) VALUES (@uid,@pid,@qty,@price)";

                    SqlCommand insertCmd = new SqlCommand(insertQuery,conn);

                    insertCmd.Parameters.AddWithValue("@uid",cart.UserID);

                    insertCmd.Parameters.AddWithValue("@pid",cart.ProdID);

                    insertCmd.Parameters.AddWithValue("@qty",cart.CartQty);

                    insertCmd.Parameters.AddWithValue("@price",cart.Price);

                    insertCmd.ExecuteNonQuery();
                    #endregion

                    return "Course added to cart!";
                }
            }

            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //Updating the cart
        [HttpPut]
        [Route("api/cart/update")]
        public string UpdateCart(Cart cart)
        {
            try
            {
                #region
                using (conn)
                {
                    // Update quantity
                    #region
                    string updateQuery = @"UPDATE Cart 
                                       SET CartQty = @qty 
                                       WHERE CartID = @CartID ";

                    SqlCommand updateCmd = new SqlCommand(updateQuery, conn);
                    updateCmd.Parameters.AddWithValue("@qty", cart.CartQty);
                    updateCmd.Parameters.AddWithValue("@CartID", cart.CartID);
                    conn.Open();
                    updateCmd.ExecuteNonQuery();
                    return "Cart Updated!!!";
                    #endregion
                }
                #endregion
            }
            catch (Exception ex)
            {
                return "Cart Not Updated!!!" + ex.Message;
            }
        }

        //Delete Particular Item From The Cart
        [HttpDelete]
        [Route("api/cart/deleteById/{id}")]
        public string DeleteCart(int id)
        {
            try
            {
                #region
                using (conn)
                {
                    // Delete The Cart
                    #region
                    string deleteQuery = @"Delete From Cart where CartID=@CartID";

                    SqlCommand deleteCmd = new SqlCommand(deleteQuery, conn);
                    deleteCmd.Parameters.AddWithValue("@CartID", id);
                    conn.Open();
                    deleteCmd.ExecuteNonQuery();
                    return "Cart Item Removed!!!";
                    #endregion
                }
                #endregion
            }
            catch (Exception ex)
            {
                return "Cart Item Not Removed!!!" + ex.Message;
            }
        }

        //Clearing the Cart
        [HttpDelete]
        [Route("api/cart/clearCart/{id}")]
        public string ClearCart(int id)
        {
            try
            {
                #region
                using (conn)
                {
                    // Delete The Cart
                    #region
                    string deleteQuery = @"Delete From Cart where UserID=@UserID";

                    SqlCommand deleteCmd = new SqlCommand(deleteQuery, conn);
                    deleteCmd.Parameters.AddWithValue("@UserID", id);
                    conn.Open();
                    deleteCmd.ExecuteNonQuery();
                    return "Cart is Cleared!!!";
                    #endregion
                }
                #endregion
            }
            catch (Exception ex)
            {
                return "Cart is not Cleared!!!" + ex.Message;
            }
        }
    }
}

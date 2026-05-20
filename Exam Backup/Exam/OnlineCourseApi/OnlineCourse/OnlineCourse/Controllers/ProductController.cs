using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Http.Cors;  //For CORS Any Client Can Access Our API
using System.Data;           //For DataBase Operation
using System.Data.SqlClient; //For SQL DataBase Operation   
using System.Configuration;  //For Accessing the Web.Config Configuration Like Connection String
using OnlineCourse.Models;  //For Accessing Our Models i.e Porperties Of Table's Column    
using OnlineCourse.Helper;
using System.IO; // For Getting The Path of File

namespace OnlineCourse.Controllers
{
    /// <summary>
    /// This Class Having a Api Related to Products Data Operations
    /// </summary>
    public class ProductController : ApiController
    {
        //Getting the connection string
        SqlConnection conn = DBContext.GetConnection();
        SqlCommand cmd;
        SqlDataReader rdr;

        //Getting All Product Data And Returning As A List
        [HttpGet]
        [Route("api/product/all")]
        public List<ProductTable> GetAllProducts()
        {
            List<ProductTable> list = new List<ProductTable>();

            try
            {
                #region
                using (conn)
                {
                    string query = "select * from ProductTable";
                    cmd = new SqlCommand(query, conn);
                    conn.Open();
                    rdr = cmd.ExecuteReader();
                    using (rdr)
                    {
                        while (rdr.Read())
                        {
                            ProductTable pt = new ProductTable();

                            pt.ProdID = (int)rdr[0];
                            pt.ProdName = (string)rdr[1];
                            pt.ProdPrice = (int)rdr[2];
                            pt.ProdImg = (string)rdr[3];
                            pt.ProdDsc = (string)rdr[4];
                            pt.ProdQty = (int)rdr[5];
                            pt.categoryId = (int)rdr[6];

                            list.Add(pt);
                        }
                    }
                }
                #endregion

                return list;
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write(ex.Message);
                list.Clear();
                return list;
            }
        }

        //Getting the Product by category id
        [HttpGet]
        [Route("api/product/category/{id:int}")]
        public List<ProductTable> GetByCategory(int id)
        {
            List<ProductTable> list = new List<ProductTable>();

            try
            {
                #region
                using (conn)
                {
                    string query = "select * from ProductTable Where CategoryId = @id";
                    cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@id", id);
                    conn.Open();
                    rdr = cmd.ExecuteReader();
                    using (rdr)
                    {
                        while (rdr.Read())
                        {
                            ProductTable pt = new ProductTable();

                            pt.ProdID = (int)rdr[0];
                            pt.ProdName = (string)rdr[1];
                            pt.ProdPrice = (int)rdr[2];
                            pt.ProdImg = (string)rdr[3];
                            pt.ProdDsc = (string)rdr[4];
                            pt.ProdQty = (int)rdr[5];
                            pt.categoryId = (int)rdr[6];

                            list.Add(pt);
                        }
                    }
                }
                #endregion

                return list;
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write(ex.Message);
                list.Clear();
                return list;
            }
        }

        //Inserting The New Product Data With Form Data Approach
        [HttpPost]
        [Route("api/product/add")]
        public string InsertProduct()
        {
            try
            {
                //Getting the Form Data
                #region
                var request = HttpContext.Current.Request;

                string name = request["ProdName"];
                int price = Convert.ToInt32(request["ProdPrice"]);
                string desc = request["ProdDsc"];
                int qty = Convert.ToInt32(request["ProdQty"]);
                int categoryId = Convert.ToInt32(request["categoryId"]);

                var file = request.Files["image"];

                string fileName = "";

                if (file != null && file.ContentLength > 0)
                {
                    fileName = Path.GetFileName(file.FileName);

                    string path = HttpContext.Current.Server.MapPath("~/Img/FeaturedProd/" + fileName);

                    file.SaveAs(path);
                }
                #endregion

                //Inserting Data into ProductTable
                #region
                using (conn)
                {
                    string query = @"INSERT INTO ProductTable 
            (ProdName, ProdPrice, ProdImg, ProdDsc, ProdQty, categoryId)
            VALUES(@name, @price, @img, @desc, @qty, @cat)";

                    SqlCommand cmd = new SqlCommand(query, conn);

                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.Parameters.AddWithValue("@price", price);
                    cmd.Parameters.AddWithValue("@img", "Img/FeaturedProd/" + fileName); // store relative path
                    cmd.Parameters.AddWithValue("@desc", desc);
                    cmd.Parameters.AddWithValue("@qty", qty);
                    cmd.Parameters.AddWithValue("@cat", categoryId);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                #endregion

                return "Product Added";
            }
            catch (Exception ex)
            {
                return "Product Not Added!!!" + ex.Message;
            }
        }

        //Update the Product Details With Form Data Approach
        [HttpPut]
        [Route("api/product/update")]
        public string UpdateProduct()
        {
            try
            {
                //Geeting The Form Data
                #region
                var request = HttpContext.Current.Request;

                int id = Convert.ToInt32(request["ProdID"]);
                string name = request["ProdName"];
                int price = Convert.ToInt32(request["ProdPrice"]);
                string desc = request["ProdDsc"];
                int qty = Convert.ToInt32(request["ProdQty"]);
                int categoryId = Convert.ToInt32(request["categoryId"]);

                var file = request.Files["image"];

                string fileName = "";
                #endregion

                //Updating the Product Data Details
                #region
                using (conn)
                {
                    conn.Open();

                    // If new file uploaded
                    #region
                    if (file != null && file.ContentLength > 0)
                    {
                        fileName = Path.GetFileName(file.FileName);

                        string path = HttpContext.Current.Server.MapPath("~/Img/FeaturedProd/" + fileName);

                        file.SaveAs(path);

                        // Update WITH new image
                        string query = @"UPDATE ProductTable SET
                                 ProdName=@name,
                                 ProdPrice=@price,
                                 ProdImg=@img,
                                 ProdDsc=@desc,
                                 ProdQty=@qty,
                                 categoryId=@cat
                                 WHERE ProdID=@id";

                        SqlCommand cmd = new SqlCommand(query, conn);

                        cmd.Parameters.AddWithValue("@img", "Img/FeaturedProd/" + fileName);
                        cmd.Parameters.AddWithValue("@name", name);
                        cmd.Parameters.AddWithValue("@price", price);
                        cmd.Parameters.AddWithValue("@desc", desc);
                        cmd.Parameters.AddWithValue("@qty", qty);
                        cmd.Parameters.AddWithValue("@cat", categoryId);
                        cmd.Parameters.AddWithValue("@id", id);

                        cmd.ExecuteNonQuery();
                    }
                    #endregion

                    // Update WITHOUT changing image
                    #region
                    else
                    {

                        string query = @"UPDATE ProductTable SET
                                 ProdName=@name,
                                 ProdPrice=@price,
                                 ProdDsc=@desc,
                                 ProdQty=@qty,
                                 categoryId=@cat
                                 WHERE ProdID=@id";

                        SqlCommand cmd = new SqlCommand(query, conn);

                        cmd.Parameters.AddWithValue("@name", name);
                        cmd.Parameters.AddWithValue("@price", price);
                        cmd.Parameters.AddWithValue("@desc", desc);
                        cmd.Parameters.AddWithValue("@qty", qty);
                        cmd.Parameters.AddWithValue("@cat", categoryId);
                        cmd.Parameters.AddWithValue("@id", id);

                        cmd.ExecuteNonQuery();
                    }
                    #endregion
                }
                #endregion

                return "Product Updated!!!!";
            }
            catch (Exception ex)
            {
                return "Product Details Not Updated!!!" + ex.Message;
            }
        }


        //Delete the Product
        [HttpDelete]
        [Route("api/product/delete/{id:int}")]
        public string DeleteProduct(int id)
        {
            try
            {
                #region
                using (conn)
                {
                    string query = @"Delete From ProductTable WHERE ProdID=@ProdID";

                    cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@ProdID", id);
                    conn.Open();
                    cmd.ExecuteNonQuery();

                }
                #endregion

                return "Product Deleted !!!";

            }
            catch (Exception ex)
            {
                return "Something Went Wrong During the Deletion!!! " + ex.Message;
            }

        }
    }
}

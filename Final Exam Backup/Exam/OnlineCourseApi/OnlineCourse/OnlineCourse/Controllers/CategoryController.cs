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

namespace OnlineCourse.Controllers
{
    /// <summary>
    /// This Class Having a Api Related to showing the category of products (i.e Courses)
    /// </summary>
    public class CategoryController : ApiController
    {
        //Getting the connection string
        SqlConnection conn = DBContext.GetConnection();
        SqlCommand cmd;
        SqlDataReader rdr;

        //Gives The Category Data 
        [HttpGet]
        [Route("api/category/all")]
        public List<Category> GetAllCategory()
        {
            List<Category> list = new List<Category>();

            try
            {
                #region
                using (conn)
                {
                    string query = "select * from Category";
                    cmd = new SqlCommand(query, conn);
                    conn.Open();
                    rdr = cmd.ExecuteReader();
                    using (rdr)
                    {
                        while (rdr.Read())
                        {
                            Category cat = new Category();
                            cat.categoryId = (int)rdr[0];
                            cat.categoryName = (string)rdr[1];
                            list.Add(cat);
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
    }
}

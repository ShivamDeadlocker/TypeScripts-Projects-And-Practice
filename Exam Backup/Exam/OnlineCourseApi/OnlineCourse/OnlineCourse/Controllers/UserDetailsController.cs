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
    /// This Class Having a Api Related to fetching the user details
    /// </summary>
    public class UserDetailsController : ApiController
    {
        //Getting the User Details
        [HttpGet]
        [Route("api/userdetails/user")]
        public List<UserDetails> GetUser()
        {
            List<UserDetails> list = new List<UserDetails>();

            try
            {
                //Getting the connection string
                SqlConnection conn = DBContext.GetConnection();
                SqlCommand cmd;
                SqlDataReader rdr;

                #region
                using (conn)
                {
                    string query = "select * from UserDetails";
                    cmd = new SqlCommand(query, conn);
                    conn.Open();
                    rdr = cmd.ExecuteReader();

                    #region
                    using (rdr)
                    {
                        while (rdr.Read())
                        {
                            UserDetails u = new UserDetails();

                            u.UserID = (int)rdr[0];
                            u.UserName = (string)rdr[1];
                            u.UserEmail = (string)rdr[2];
                            u.UserPassword = (string)rdr[3];
                            u.UserConfirmPassword = (string)rdr[4];
                            u.TypeId = (int)rdr[5];

                            list.Add(u);
                        }
                    }
                    #endregion
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

        //Getting The User Type eg. Admin, Student, Instructor
        [HttpGet]
        [Route("api/userdetails/userType")]
        public List<UserType> GetUserType()
        {
            List<UserType> list = new List<UserType>();

            try
            {
                SqlConnection conn = DBContext.GetConnection();
                SqlCommand cmd;
                SqlDataReader rdr;

                #region
                using (conn)
                {
                    string query = "select * from UserType";
                    cmd = new SqlCommand(query, conn);
                    conn.Open();
                    rdr = cmd.ExecuteReader();

                    #region
                    using (rdr)
                    {
                        while (rdr.Read())
                        {
                            UserType ut = new UserType();

                            ut.TypeId = (int)rdr[0];
                            ut.TypeName = (string)rdr[1];

                            list.Add(ut);
                        }
                    }
                    #endregion
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

        //Adding New User During The Signup
        [HttpPost]
        [Route("api/userdetails/user/addUser")]
        public string AddUser(UserDetails user)
        {
            try
            {
                //Getting the connection string
                SqlConnection conn = DBContext.GetConnection();

                // Insert user
                #region
                using (conn)
                {
                    #region
                    string insertQuery = @"INSERT INTO UserDetails 
                                           (UserName, UserEmail, UserPassword, UserConfirmPassword, TypeId)
                                            VALUES (@UserName, @UserEmail, @UserPassword, @UserConfirmPassword, @TypeId)"; // 2 = normal user

                    using (SqlCommand cmd = new SqlCommand(insertQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserName", user.UserName);
                        cmd.Parameters.AddWithValue("@UserEmail", user.UserEmail);
                        cmd.Parameters.AddWithValue("@UserPassword", user.UserPassword);
                        cmd.Parameters.AddWithValue("@UserConfirmPassword", user.UserConfirmPassword);
                        if (user.TypeId <= 0)
                        {
                            cmd.Parameters.AddWithValue("@TypeId", 2);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@TypeId", user.TypeId);
                        }
                        conn.Open();
                        cmd.ExecuteNonQuery();
                    }
                    #endregion
                }
                #endregion

                return "User Added Added !!!";

            }
            catch (Exception ex)
            {
                return "User Not Added!!!" + ex.Message;
            }
        }

        //Deleting User By Admin
        [HttpDelete]
        [Route("api/userdetails/user/deleteUser/{id:int}")]
        public string DeleteUser(int id)
        {
            try
            {
                #region
                //Getting the connection string
                SqlConnection conn = DBContext.GetConnection();

                using (conn)
                {
                    // Delete user
                    #region
                    string deleteQuery = @"Delete from  UserDetails where UserID=@UserID";

                    using (SqlCommand cmd = new SqlCommand(deleteQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserID", id);
                        conn.Open();
                        cmd.ExecuteNonQuery();
                    }
                    #endregion
                }
                return "User Deleted!!!";
                #endregion
            }
            catch (Exception ex)
            {
                return "User Not Deleted!!!" + ex.Message;
            }
        }
    }
}

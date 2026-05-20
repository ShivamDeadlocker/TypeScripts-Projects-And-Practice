using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

namespace OnlineCourse.Helper
{
    public static class DBContext
    {
        public static SqlConnection GetConnection()
        {
            string str = ConfigurationManager.ConnectionStrings["conStr"].ConnectionString;
            SqlConnection conn = new SqlConnection(str);
            return conn;
        }
    }
}
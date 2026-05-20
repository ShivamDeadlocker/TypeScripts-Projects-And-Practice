using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineCourse.Models
{
    public class Bill
    {
        public int BillID { get; set; }

        public int UserID { get; set; }

        public UserDetails User { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineCourse.Models
{
    public class Cart
    {
        public int CartID { get; set; }

        public int UserID { get; set; }

        public int ProdID { get; set; }

        public int CartQty { get; set; }

        public int Price { get; set; }

        // Navigation Properties
        public UserDetails User { get; set; }
        public ProductTable Product { get; set; }
    }
}
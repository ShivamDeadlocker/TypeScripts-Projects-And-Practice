using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineCourse.Models
{
    public class BillDetails
    {
        public int BillDetailsID { get; set; }

        public int BillID { get; set; }

        public int ProdID { get; set; }

        public int BillQty { get; set; }

        public int BillAmt { get; set; }

        // Navigation Properties
        public Bill Bill { get; set; }
        public ProductTable Product { get; set; }
    }
}
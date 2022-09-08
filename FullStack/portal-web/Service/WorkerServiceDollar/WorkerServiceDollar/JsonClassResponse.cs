using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkerServiceDollar
{


    public class Currencies
    {
        public string Source { get; set; }
        public USD USD { get; set; }

    }



    public class Results
    {
        public Currencies currencies { get; set; }
        public List<string> availableSources { get; set; }
    }

    public class Root
    {
        public string By { get; set; }
        public bool ValidKey { get; set; }
        public Results results { get; set; }
        public double ExecutionTime { get; set; }
        public bool FromCache { get; set; }
    }


    public class USD
    {
        public string name { get; set; }
        public double buy { get; set; }
        public double sell { get; set; }
        public double variation { get; set; }
    }


}

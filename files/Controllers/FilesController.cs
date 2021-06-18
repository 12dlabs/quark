using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.PlatformAbstractions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FilesWebLibs.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        IApplicationEnvironment _hostingEnvironment;

        public FilesController(IApplicationEnvironment hostingEnvironment)
        { 
            _hostingEnvironment = hostingEnvironment; 
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var path = GetLocalPath(id + ".dat");
            if (!System.IO.File.Exists(path)) return HttpNotFound();
            return File(path, "text/plain");
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]string value)
        {
            var ids = new List<string>();

            foreach (var item in Request.ReadFormAsync().Result.Files)
            {
                if (item.ContentDisposition == null) continue;

                using (var ms = item.OpenReadStream())
                {
                    using (var br = new BinaryReader(ms))
                    {
                        if (ms.Length <= 0)
                            break;
                        var data = br.ReadBytes((int)ms.Length);
                        var id = Guid.NewGuid().ToString();
                        try
                        {
                            var path = GetLocalPath(id + ".dat");
                            System.IO.File.WriteAllBytes(path, data);
                            ids.Add(id);
                        }
                        catch { }
                    }
                }
            }

            if (ids.Count == 0)
                return HttpBadRequest();
            else if (ids.Count == 1)
                return Ok(ids.FirstOrDefault());
            else
                return Ok(ids);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var path = GetLocalPath(id + ".dat");
            System.IO.File.Delete(path);
        }

        private string GetLocalPath(string fileName)
        {
            var dirPath = Path.Combine(_hostingEnvironment.ApplicationBasePath, "\\data");
            if (!Directory.Exists(dirPath)) Directory.CreateDirectory(dirPath);
            return Path.Combine(dirPath, fileName);
        }

        private string GetFileName(string contentDisposition)
        {
            return contentDisposition ?
                .Split(';')
                .SingleOrDefault(part => part.Contains("filename"))
                .Split('=')
                .Last()
                .Trim('"');
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactWithbackend.Data;
using ReactWithbackend.Web.Models;

namespace ReactWithbackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(p);
        }
        [HttpPost]
        [Route("editperson")]
        public void EditPerson(PersonViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.EditPerson(vm.Person);
        }
        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(PersonViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(vm.Person);
        }

    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithbackend.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;
        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var ctx = new PeopleDataContext(_connectionString);
            return ctx.People.ToList();
        }
        public void AddPerson(Person p)
        {
            using var ctx = new PeopleDataContext(_connectionString);
            ctx.People.Add(p);
            ctx.SaveChanges();
        }
        public void EditPerson(Person p)
        {
            using var ctx = new PeopleDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE People SET FirstName = {p.FirstName}, LastName = {p.LastName}Age = {p.Age} WHERE Id = {p.Id}");
        }
        public void DeletePerson(Person p)
        {
            using var ctx = new PeopleDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {p.Id}");

        }
    }
}

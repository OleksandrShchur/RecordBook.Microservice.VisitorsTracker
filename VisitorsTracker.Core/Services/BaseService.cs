using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using VisitorsTracker.Core.IServices;
using VisitorsTracker.Db.EFCore;

namespace VisitorsTracker.Core.Services
{
    public class BaseService<T> : IBaseService<T>
        where T : class
    {
        protected readonly AppDbContext _context;

        public BaseService(AppDbContext context)
        {
            _context = context;
        }

        protected DbSet<T> Entities { get => _context.Set<T>(); }

        public async Task<T> Insert(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }

            Entities.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Update(T entity)
        {
            if(entity == null)
            {
                throw new NotImplementedException();
            }

            Entities.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Delete(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }

            Entities.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

    }
}

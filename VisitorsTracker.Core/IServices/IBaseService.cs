using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisitorsTracker.Core.IServices
{
    public interface IBaseService<T>
        where T : class
    {
        Task<T> InsertAsync(T entity);

        //T Update(T entity);

        //T Delete(T entity);
    }
}

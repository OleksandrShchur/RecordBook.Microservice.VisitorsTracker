using System.Threading.Tasks;

namespace VisitorsTracker.Core.IServices
{
    public interface IBaseService<T>
        where T : class
    {
        Task<T> Insert(T entity);

        Task<T> Update(T entity);

        Task Delete(T entity);
    }
}

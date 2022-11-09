using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Dating.Infrastructure.EF.Persistence;

internal class GenericRepository<TContext> : IRepository
    where TContext : DbContext
{
    private readonly TContext _context;

    public GenericRepository(
        TContext context,
        IUnitOfWork unitOfWork)
    {
        _context = context;
        UnitOfWork = unitOfWork;
    }

    public IUnitOfWork UnitOfWork { get; }
    
    public Task<int> CountAsync<TEntity>(Expression<Func<TEntity, bool>>? predicate = default)
        where TEntity: class, IAggregateRoot
    {
        return predicate == default ? _context.Set<TEntity>().CountAsync()
            : _context.Set<TEntity>().CountAsync(predicate);
    }

    public Task<double> SumAsync<TEntity>(Expression<Func<TEntity, double>> selector)
        where TEntity : class, IAggregateRoot
    {
        return _context.Set<TEntity>().SumAsync(selector);
    }

    public async Task<TEntity?> GetAsync<TEntity>(object? id)
        where TEntity : class, IAggregateRoot
    {
        var entity = await _context.Set<TEntity>().FindAsync(id);
        return entity;
    }

    public Task<TEntity?> GetAsync<TEntity>(Expression<Func<TEntity, bool>> predicate)
        where TEntity : class, IAggregateRoot
    {
        return _context.Set<TEntity>().FirstOrDefaultAsync(predicate);
    }

    public Task<List<TEntity>> GetListAsync<TEntity>(Expression<Func<TEntity, bool>>? predicate = default)
        where TEntity : class, IAggregateRoot
    {
        return predicate == default ? _context.Set<TEntity>().ToListAsync()
            : _context.Set<TEntity>().Where(predicate).ToListAsync();
    }

    public Task<Dictionary<TKey, TEntity>> GetDictionaryAsync<TKey, TEntity>(
        Func<TEntity, TKey> keySelector, 
        Expression<Func<TEntity, bool>>? predicate = default) 
        where TEntity : class, IAggregateRoot 
        where TKey : notnull
    {
        return predicate == default ? _context.Set<TEntity>().ToDictionaryAsync(keySelector)
            : _context.Set<TEntity>().Where(predicate).ToDictionaryAsync(keySelector);
    }

    public IQueryable<TEntity> Query<TEntity>(Expression<Func<TEntity, bool>>? predicate = default)
        where TEntity : class, IAggregateRoot
    {
        return predicate == default
            ? _context.Set<TEntity>()
            : _context.Set<TEntity>().Where(predicate);
    }

    public async Task AddAsync<TEntity>(TEntity entity)
        where TEntity : class, IAggregateRoot
    {
        await _context.Set<TEntity>().AddAsync(entity);
    }

    public void Update<TEntity>(TEntity entity)
        where TEntity : class, IAggregateRoot
    {
        _context.Set<TEntity>().Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }

    public void Delete<TEntity>(TEntity? entity)
        where TEntity : class, IAggregateRoot
    {
        if (entity == null)
            return;

        _context.Set<TEntity>().Remove(entity);
    }
}
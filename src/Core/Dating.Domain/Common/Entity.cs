using System.ComponentModel.DataAnnotations.Schema;

namespace Dating.Domain.Common;

public abstract class Entity : IAggregateRoot
{
    private readonly List<DomainEvent> _domainEvents = new();
    
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [NotMapped]
    public IReadOnlyCollection<DomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void AddEvent(DomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void RemoveEvent(DomainEvent domainEvent)
    {
        _domainEvents.Remove(domainEvent);
    }

    public void ClearEvents()
    {
        _domainEvents.Clear();
    }
}
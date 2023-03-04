namespace CorporateBlog.Domain.Exceptions
{
    public class DefaultRoleException : Exception
    {
        public override string? StackTrace { get; }

        public DefaultRoleException() : base("Cannot change or delete the default role") { }

        public DefaultRoleException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

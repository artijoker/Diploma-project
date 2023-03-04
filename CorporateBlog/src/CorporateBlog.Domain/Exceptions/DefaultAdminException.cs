namespace CorporateBlog.Domain.Exceptions
{
    public class DefaultAdminException : Exception
    {
        public override string? StackTrace { get; }

        public DefaultAdminException() : base("Cannot change or delete default admin account") { }

        public DefaultAdminException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

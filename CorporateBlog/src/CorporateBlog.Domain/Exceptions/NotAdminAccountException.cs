namespace CorporateBlog.Domain.Exceptions
{
    public class NotAdminAccountException : Exception
    {
        public override string? StackTrace { get; }

        public NotAdminAccountException() : base("Not Admin account") { }

        public NotAdminAccountException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

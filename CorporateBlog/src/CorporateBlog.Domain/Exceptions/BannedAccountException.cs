namespace CorporateBlog.Domain.Exceptions
{
    public class BannedAccountException : Exception
    {
        public override string? StackTrace { get; }

        public BannedAccountException() : base("Account is blocked") { }

        public BannedAccountException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

namespace CorporateBlog.Domain.Exceptions
{
    public class DeletedAccountException : Exception
    {
        public override string? StackTrace { get; }

        public DeletedAccountException() : base("Account deleted")
        {
        }

        public DeletedAccountException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

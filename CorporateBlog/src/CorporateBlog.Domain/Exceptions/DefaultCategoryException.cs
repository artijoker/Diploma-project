namespace CorporateBlog.Domain.Exceptions
{
    public class DefaultCategoryException : Exception
    {
        public override string? StackTrace { get; }

        public DefaultCategoryException() : base("Cannot change or delete the default category")
        {
        }

        public DefaultCategoryException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

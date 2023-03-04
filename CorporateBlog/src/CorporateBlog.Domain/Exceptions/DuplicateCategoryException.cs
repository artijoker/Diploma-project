namespace CorporateBlog.Domain.Exceptions
{
    public class DuplicateCategoryException : Exception
    {
        public override string? StackTrace { get; }

        public DuplicateCategoryException() : base("Duplicate category") { }

        public DuplicateCategoryException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}

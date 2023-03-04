namespace CorporateBlog.Domain.Exceptions
{
    public class BlockeDtokenException : Exception
    {
        public override string? StackTrace { get; }

        public BlockeDtokenException() : base("Blocked token") { }

        public BlockeDtokenException(string message) : base(message) { }

        public BlockeDtokenException(string? message, string? stackTrace = null) : base(message) => StackTrace = stackTrace;
    }
}


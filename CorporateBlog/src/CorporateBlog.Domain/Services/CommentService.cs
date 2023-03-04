using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.Domain.Services
{
    public class CommentService
    {
        private readonly IUnitOfWork _unit;

        public CommentService(IUnitOfWork unit)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
        }

        public async Task<CommentDto> GetCommentById(int commentId)
        {
            var comment = await _unit.CommentRepository.GetById(commentId);

            return new()
            {
                Id = comment.Id,
                Text = comment.Text,
                AccountId = comment.AccountId,
                AccountNickname = comment.Account!.Login,
                PostId = comment.PostId,
                Created = comment.Created,
                IsDeleted = comment.IsDeleted
            };
        }

        public async Task<IReadOnlyList<CommentDto>> AddComment(int accountId, int postId, string text)
        {
            var comment = new Comment()
            {
                AccountId = accountId,
                PostId = postId,
                Text = text,
                Created = DateTime.Now
            };

            await _unit.CommentRepository.Add(comment);
            await _unit.SaveChangesAsync();

            return await GetCommentsByPostId(postId);
        }

        public async Task UpdateComment(int commentId, string newText)
        {
            var comment = await _unit.CommentRepository.GetById(commentId);

            comment.Text = newText;
            comment.Created = DateTime.Now;

            await _unit.CommentRepository.Update(comment);
            await _unit.SaveChangesAsync();

        }

        public async Task RemoveComment(int commentId)
        {
            var comment = await _unit.CommentRepository.GetById(commentId);
            comment.IsDeleted = true;

            await _unit.CommentRepository.Update(comment);
            await _unit.SaveChangesAsync();
        }


        public async Task<IReadOnlyList<CommentDto>> GetCommentsByPostId(int postId)
        {
            var comments = await _unit.CommentRepository.GetCommentsByPostId(postId);

            var commentsDto = new List<CommentDto>();

            foreach (var comment in comments)
            {
                commentsDto.Add(new()
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    AccountId = comment.AccountId,
                    AccountNickname = comment.Account!.Login,
                    PostId = comment.PostId,
                    Created = comment.Created
                });
            }
            return commentsDto;
        }



        public async Task<IReadOnlyList<CommentDto>> GetCommentsOnPublishedPostsByAccountId(int accountId)
        {
            var comments = await _unit.CommentRepository.GetCommentsByAccountId(accountId);

            comments = comments.Where(c => c.Post!.Status == PostStatus.Published).ToList();

            var commentsDto = new List<CommentDto>();

            foreach (var comment in comments)
            {
                commentsDto.Add(new()
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    AccountId = comment.AccountId,
                    AccountNickname = comment.Account!.Login,
                    PostId = comment.PostId,
                    PostTitle = comment.Post!.Title,
                    Created = comment.Created
                });
            }
            return commentsDto;
        }

        public async Task<IReadOnlyList<CommentDto>> GetAllComments()
        {
            var comments = await _unit.CommentRepository.GetAll();

            var commentsDto = new List<CommentDto>();

            foreach (var comment in comments)
            {
                commentsDto.Add(new()
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    AccountId = comment.AccountId,
                    AccountNickname = comment.Account!.Login,
                    PostId = comment.PostId,
                    PostTitle = comment.Post!.Title,
                    Created = comment.Created,
                    IsDeleted = comment.IsDeleted
                });
            }
            return commentsDto;
        }

    }
}

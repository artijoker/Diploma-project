using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.Design;
using CorporateBlog.Domain.Entities;
using CorporateBlog.Domain;
using CorporateBlog.Models.Dto;

namespace CorporateBlog.Domain.Services
{
    public class ComplaintService
    {
        private readonly IUnitOfWork _unit;

        public ComplaintService(IUnitOfWork unit)
        {
            _unit = unit ?? throw new ArgumentNullException(nameof(unit));
        }

        public async Task<IReadOnlyList<ComplaintPostDto>> GetAllComplaintsOnPosts()
        {
            var complaints = await _unit.ComplaintOnPostRepository.GetAll();
            return complaints.Select(c => ComplaintOnPostToDto(c)).ToList();
        }

        public async Task<IReadOnlyList<ComplaintCommentDto>> GetAllComplaintsOnComments()
        {
            var complaints = await _unit.ComplaintOnCommentRepository.GetAll();
            return complaints.Select(c => ComplaintOnCommentToDto(c)).ToList();
        }

        public async Task<IReadOnlyList<ComplaintPostDto>> GetComplaintsOnPostsByAccountId(int accountId)
        {
            var complaints = await _unit.ComplaintOnPostRepository.GetComplaintsByAccountId(accountId);
            return complaints.Select(c => ComplaintOnPostToDto(c)).ToList();
        }

        public async Task<IReadOnlyList<ComplaintPostDto>> GetComplaintsOnPostsByPostId(int postId)
        {
            var complaints = await _unit.ComplaintOnPostRepository.GetComplaintsByPostId(postId);
            return complaints.Select(c => ComplaintOnPostToDto(c)).ToList();
        }

        public async Task<IReadOnlyList<ComplaintCommentDto>> GetComplaintsOnCommentsByAccountId(int accountId)
        {
            var complaints = await _unit.ComplaintOnCommentRepository.GetComplaintsByAccountId(accountId);
            return complaints.Select(c => ComplaintOnCommentToDto(c)).ToList();
        }

        public async Task<IReadOnlyList<ComplaintCommentDto>> GetComplaintsOnCommentsByCommentId(int commentId)
        {
            var complaints = await _unit.ComplaintOnCommentRepository.GetComplaintsByCommentId(commentId);
            return complaints.Select(c => ComplaintOnCommentToDto(c)).ToList();
        }

        public async Task<int> CountComplaintsOnPosts()
            => await _unit.ComplaintOnPostRepository.CountComplaints();

        public async Task<int> CountComplaintsOnComments()
            => await _unit.ComplaintOnCommentRepository.CountComplaints();


        public async Task AddComplaintOnPost(int accountId, int postId, string text)
        {
            var account = await _unit.AccountRepository.GetById(accountId);
            var post = await _unit.PostRepository.GetById(postId);

            await _unit.ComplaintOnPostRepository.Add(new()
            {
                Text = text,
                AccountId = account.Id,
                PostId = post.Id,
                Account = account,
                Post = post,
                Created = DateTime.Now
            });

            await _unit.SaveChangesAsync();
        }

        public async Task AddComplaintOnComment(int accountId, int commentId, string text)
        {
            var account = await _unit.AccountRepository.GetById(accountId);
            var comment = await _unit.CommentRepository.GetById(commentId);

            await _unit.ComplaintOnCommentRepository.Add(new()
            {
                Text = text,
                AccountId = account.Id,
                CommentId = comment.Id,
                Account = account,
                Comment = comment,
                Created = DateTime.Now
            });

            await _unit.SaveChangesAsync();
        }

        public async Task RemoveComplaintOnPost(int complaintId)
        {
            var complaint = await _unit.ComplaintOnPostRepository.GetById(complaintId);

            complaint.IsDeleted = true;

            await _unit.ComplaintOnPostRepository.Update(complaint);

            await _unit.SaveChangesAsync();
        }

        public async Task RemoveComplaintOnComment(int complaintId)
        {
            var complaint = await _unit.ComplaintOnCommentRepository.GetById(complaintId);

            complaint.IsDeleted = true;

            await _unit.ComplaintOnCommentRepository.Update(complaint);

            await _unit.SaveChangesAsync();
        }

        private static ComplaintCommentDto ComplaintOnCommentToDto(ComplaintOnComment complaint)
        {
            return new()
            {
                Id = complaint.Id,
                Text = complaint.Text,
                AccountId = complaint.AccountId,
                AccountNickname = complaint.Account!.Login,
                CommentId = complaint.CommentId,
                Created = complaint.Created
            };
        }

        private static ComplaintPostDto ComplaintOnPostToDto(ComplaintOnPost complaint)
        {
            return new()
            {
                Id = complaint.Id,
                Text = complaint.Text,
                AccountId = complaint.AccountId,
                AccountNickname = complaint.Account!.Login,
                PostId = complaint.PostId,
                Created = complaint.Created
            };
        }
    }
}


package ubb.evotingsystembackend.Requests;

public record VoteRequest(String encrytedVote, String signedVote, Integer citizenID) {
}

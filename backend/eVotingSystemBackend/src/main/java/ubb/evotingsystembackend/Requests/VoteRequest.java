package ubb.evotingsystembackend.Requests;

public record VoteRequest(byte[] encrytedVote, byte[] signedVote, Integer citizenID) {
}

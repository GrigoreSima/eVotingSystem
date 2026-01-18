package ubb.evotingsystembackend.Domain;

public class ResultForOne {
    private Candidate candidate;
    private Integer votes;

    public ResultForOne(Candidate candidate, Integer votes) {
        this.candidate = candidate;
        this.votes = votes;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public Integer getVotes() {
        return votes;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }
}

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    const results = [];
  
    learnerSubmissions.forEach((submission) => {
      const learnerResult = { id: submission.learner_id }; 
      let totalScore = 0;
      let totalPossiblePoints = 0;
  
      assignmentGroup.assignments.forEach((assignment) => {
        // matching submission for each assignment
        const learnerAssignment = learnerSubmissions.find((sub) => sub.assignment_id === assignment.id);
        if (!learnerAssignment) return;
  
        // assignment is due?
        const isLate = new Date(learnerAssignment.submission.submitted_at) > new Date(assignment.due_at);
        let score = learnerAssignment.submission.score;
  
        // Deduct 10% if late
        if (isLate) {
          score -= (0.1 * assignment.points_possible);
        }
  
        const scorePercentage = (score / assignment.points_possible) * 100;
  
        learnerResult[assignment.id] = scorePercentage;
  
        // total score
        totalScore += score;
        totalPossiblePoints += assignment.points_possible;
      });
  
      // weighted average
      learnerResult.avg = (totalScore / totalPossiblePoints) * 100;
  
      results.push(learnerResult);
    });
  
    return results;
  }
  
  // Example data
  {
    "name": "sba-308-example",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "start": "parcel ./src/index.html",
      "build": "parcel build ./src/index.html"
    },
    "devDependencies": {
      "parcel": "^2.0.0"
    },
    "keywords": []
  }
  
  
  
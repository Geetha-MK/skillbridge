function Reviews() {

  const reviews = [
    {
      id: 1,
      initials: 'AS',
      name: 'Ananya S',
      skill: 'Java Learner',
      rating: 5,
      comment:
        'Very helpful in understanding Java concepts and solving programming problems.',
      date: '2 days ago'
    },
    {
      id: 2,
      initials: 'RK',
      name: 'Rahul K',
      skill: 'Java Learner',
      rating: 5,
      comment:
        'Explained the concepts clearly and made learning Java much easier.',
      date: '5 days ago'
    },
    {
      id: 3,
      initials: 'PS',
      name: 'Priya S',
      skill: 'SQL Learner',
      rating: 4,
      comment:
        'Good explanation of SQL queries, joins and database concepts.',
      date: '1 week ago'
    },
    {
      id: 4,
      initials: 'AM',
      name: 'Arjun M',
      skill: 'Spring Boot Learner',
      rating: 5,
      comment:
        'Really helpful while learning Spring Boot and REST API development.',
      date: '2 weeks ago'
    }
  ]

  return (
    <div className="reviews-page">

      {/* Header */}

      <section className="reviews-header">

        <span className="reviews-label">
          SKILLBRIDGE
        </span>

        <h1>
          Reviews
        </h1>

        <p>
          See what learners and teachers are saying
          about their learning experiences.
        </p>

      </section>


      {/* Reviews Content */}

      <section className="reviews-content">

        <div className="reviews-title">

          <div>
            <span className="reviews-section-label">
              COMMUNITY FEEDBACK
            </span>

            <h2>
              What People Say
            </h2>
          </div>

          <div className="reviews-summary">

            <strong>
              4.8
            </strong>

            <span>
              ★★★★★
            </span>

            <small>
              Based on {reviews.length} reviews
            </small>

          </div>

        </div>


        {/* Review List */}

        <div className="reviews-list">

          {reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <div className="review-top">

                <div className="review-user">

                  <div className="review-avatar">
                    {review.initials}
                  </div>

                  <div>

                    <h3>
                      {review.name}
                    </h3>

                    <span className="review-skill">
                      {review.skill}
                    </span>

                  </div>

                </div>

                <span className="review-date">
                  {review.date}
                </span>

              </div>


              <div className="review-rating">

                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}

              </div>


              <p className="review-comment">
                {review.comment}
              </p>

            </div>

          ))}

        </div>


        {/* Write Review */}

        <div className="write-review-card">

          <div>
            <span className="reviews-section-label">
              YOUR EXPERIENCE
            </span>

            <h2>
              Share Your Experience
            </h2>

            <p>
              Help other learners and teachers by sharing
              your experience on SkillBridge.
            </p>
          </div>

          <button className="write-review-button">
            Write a Review
          </button>

        </div>

      </section>

    </div>
  )
}

export default Reviews
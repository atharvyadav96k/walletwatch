import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5" style={{ background: 'linear-gradient(135deg, #3b82f6, #9333ea)' }}>
        <div className="container">
          <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Welcome to Wallet Watch
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeIn animate__delay-2s">
            Manage your finances effortlessly and securely. Track, analyze, and monitor your spending.
          </p>
          <a href="/register" className="btn btn-light btn-lg shadow-lg px-4 py-2 animate__animated animate__fadeIn animate__delay-3s">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="bi bi-wallet2 display-1 text-primary"></i>
              <h4 className="mt-3">Track Your Spending</h4>
              <p>Monitor your transactions and spending patterns in real-time.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-bar-chart display-1 text-primary"></i>
              <h4 className="mt-3">Analytics Dashboard</h4>
              <p>Get detailed insights into your finances with our intuitive dashboard.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-shield-lock display-1 text-primary"></i>
              <h4 className="mt-3">Secure and Private</h4>
              <p>Your financial data is encrypted and stored securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Social Media Style */}
      <section className="testimonials bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Users Are Saying</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="John Doe"
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">John Doe</h6>
                      <p className="text-muted mb-0">@john_doe</p>
                    </div>
                  </div>
                  <p className="card-text">"Wallet Watch has completely transformed the way I manage my money. I can track my spending and save more effectively. Highly recommend!"</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt="Jane Smith"
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">Jane Smith</h6>
                      <p className="text-muted mb-0">@jane_smith</p>
                    </div>
                  </div>
                  <p className="card-text">"I love the insights I get about my spending habits. The app is easy to use and highly secure. It's a game-changer!"</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/33.jpg"
                      alt="Mark Lee"
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">Mark Lee</h6>
                      <p className="text-muted mb-0">@mark_lee</p>
                    </div>
                  </div>
                  <p className="card-text">"The best budgeting tool I've ever used! The reports and graphs are so helpful. Highly recommended!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="display-4">Ready to Take Control of Your Finances?</h2>
          <p className="lead">Sign up now and start managing your money like a pro!</p>
          <a href="/register" className="btn btn-light btn-lg">Sign Up</a>
          <p className="mt-3">Already have an account? <a href="/login" className="text-light">Log In</a></p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; 2024 Wallet Watch. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

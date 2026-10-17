import {
  createContext,
  useContext,
  useState,
} from "react";

import API_BASE_URL from "../services/api";
import { useAuth } from "./AuthContext";

const ReviewContext = createContext(null);

function ReviewProvider({ children }) {
  const {
    token,
    isAuthenticated,
  } = useAuth();

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     FORMAT REVIEWS
  ===================================================== */

  const formatReviews = (items) => {
    return items.map((review) => ({
      id:
        review._id ||
        review.id,

      _id:
        review._id ||
        review.id,

      product:
        review.product,

      user:
        review.user,

      name:
        review.name,

      rating:
        Number(review.rating),

      comment:
        review.comment,

      date:
        review.createdAt
          ? new Date(
              review.createdAt
            ).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )
          : "Recently",
    }));
  };

  /* =====================================================
     GET PRODUCT REVIEWS
  ===================================================== */

  const fetchReviews = async (
    productId
  ) => {
    if (!productId) {
      setReviews([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/reviews/product/${productId}`,
        {
          method: "GET",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch reviews."
        );
      }

      const backendReviews =
        data.reviews || [];

      setReviews(
        formatReviews(
          backendReviews
        )
      );

    } catch (error) {
      console.error(
        "Error fetching reviews:",
        error
      );

      setError(
        error.message ||
          "Failed to fetch reviews."
      );

      setReviews([]);

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     ADD REVIEW
  ===================================================== */

  const addReview = async (
    productId,
    rating,
    comment
  ) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to write a review."
      );
    }

    if (!productId) {
      throw new Error(
        "Product ID is required."
      );
    }

    if (
      !rating ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      throw new Error(
        "Please select a rating from 1 to 5."
      );
    }

    if (!comment?.trim()) {
      throw new Error(
        "Please write a review."
      );
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/reviews/product/${productId}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            rating:
              Number(rating),

            comment:
              comment.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit review."
        );
      }

      /*
        Backend may return:
        {
          review: {...}
        }
      */

      if (data.review) {
        const formattedReview =
          formatReviews([
            data.review,
          ])[0];

        setReviews(
          (currentReviews) => [
            formattedReview,
            ...currentReviews,
          ]
        );
      } else {
        /*
          If backend response does not
          contain the created review,
          reload product reviews.
        */

        await fetchReviews(
          productId
        );
      }

      return data;

    } catch (error) {
      console.error(
        "Error adding review:",
        error
      );

      setError(
        error.message ||
          "Failed to submit review."
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     UPDATE REVIEW
  ===================================================== */

  const updateReview = async (
    reviewId,
    rating,
    comment
  ) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to update your review."
      );
    }

    if (!reviewId) {
      throw new Error(
        "Review ID is required."
      );
    }

    if (
      !rating ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      throw new Error(
        "Please select a rating from 1 to 5."
      );
    }

    if (!comment?.trim()) {
      throw new Error(
        "Please write a review."
      );
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/reviews/${reviewId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            rating:
              Number(rating),

            comment:
              comment.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update review."
        );
      }

      /*
        Update review locally if backend
        returns the updated review.
      */

      if (data.review) {
        const formattedReview =
          formatReviews([
            data.review,
          ])[0];

        setReviews(
          (currentReviews) =>
            currentReviews.map(
              (review) =>
                String(review.id) ===
                String(reviewId)
                  ? formattedReview
                  : review
            )
        );
      }

      return data;

    } catch (error) {
      console.error(
        "Error updating review:",
        error
      );

      setError(
        error.message ||
          "Failed to update review."
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     DELETE REVIEW
  ===================================================== */

  const deleteReview = async (
    reviewId
  ) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to delete your review."
      );
    }

    if (!reviewId) {
      throw new Error(
        "Review ID is required."
      );
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/reviews/${reviewId}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete review."
        );
      }

      setReviews(
        (currentReviews) =>
          currentReviews.filter(
            (review) =>
              String(review.id) !==
              String(reviewId)
          )
      );

      return data;

    } catch (error) {
      console.error(
        "Error deleting review:",
        error
      );

      setError(
        error.message ||
          "Failed to delete review."
      );

      throw error;

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     CLEAR ERROR
  ===================================================== */

  const clearError = () => {
    setError("");
  };

  /* =====================================================
     CONTEXT
  ===================================================== */

  return (
    <ReviewContext.Provider
      value={{
        reviews,

        loading,

        error,

        fetchReviews,

        addReview,

        updateReview,

        deleteReview,

        clearError,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

/* =====================================================
   USE REVIEW
===================================================== */

export function useReviews() {
  const context =
    useContext(
      ReviewContext
    );

  if (!context) {
    throw new Error(
      "useReviews must be used inside ReviewProvider"
    );
  }

  return context;
}

export default ReviewProvider;
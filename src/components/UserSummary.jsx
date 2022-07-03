import { useState } from "react";

function UserSummary({ userData }) {
  const [showMore, setShowMore] = useState(false);
  console.log(userData);

  if (userData !== null) {
    const user = userData.results[0];

    const { dob, email, gender, location, login, name, picture } = user;
    const { city, country, postcode, state, street } = location;

    return (
      <div
        className="user-summary"
        style={showMore ? { alignSelf: "stretch" } : {}}
      >
        <div className="user-summary__heading">
          <h1>{`${name.first} ${name.last}`}</h1>
          <h2>{email}</h2>
        </div>

        {showMore && (
          <ul className="user-summary__details">
            {/* Picture */}
            <li className="user-summary__item col-span-2">
              <img
                className="user-summary__image"
                src={picture.medium}
                alt=""
              />
            </li>

            {/* Address */}
            <li className="user-summary__item col-span-2">
              <div className="user-summary__group">
                <div className="user-summary__label">Username:</div>
                <div className="user-summary__content">{login.username}</div>
              </div>
            </li>

            {/* Street */}
            <li className="user-summary__item col-span-2">
              <div className="user-summary__group">
                <div className="user-summary__label">Street:</div>
                <div className="user-summary__content">{`${street.number} ${street.name}`}</div>
              </div>
            </li>

            {/* City */}
            <li className="user-summary__item">
              <div className="user-summary__group">
                <div className="user-summary__label">City:</div>
                <div className="user-summary__content">{city}</div>
              </div>
            </li>

            {/* State */}
            <li className="user-summary__item">
              <div className="user-summary__group">
                <div className="user-summary__label">State:</div>
                <div className="user-summary__content">{state}</div>
              </div>
            </li>

            {/* Country */}
            <li className="user-summary__item">
              <div className="user-summary__group">
                <div className="user-summary__label">Country:</div>
                <div className="user-summary__content">{country}</div>
              </div>
            </li>

            {/* Postcode */}
            <li className="user-summary__item">
              <div className="user-summary__group">
                <div className="user-summary__label">Postcode:</div>
                <div className="user-summary__content">{postcode}</div>
              </div>
            </li>

            {/* Gender */}
            <li className="user-summary__item">
              <div className="user-summary__group">
                <div className="user-summary__label">Gender:</div>
                <div className="user-summary__content">{gender}</div>
              </div>
            </li>

            {/* Age */}
            <li className="user-summary__item">
              <div className="user-summary__group">
                <div className="user-summary__label">Age:</div>
                <div className="user-summary__content">{dob.age}</div>
              </div>
            </li>
          </ul>
        )}
        <div className="user-summary__buttons">
          <button
            className="user-summary__button"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    );
  } else {
    return <div>{"There is no user data"}</div>;
  }
}

export default UserSummary;

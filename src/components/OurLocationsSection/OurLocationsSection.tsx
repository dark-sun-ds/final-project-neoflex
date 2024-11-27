import './OurLocationsSection.css'
import locations from '../../assets/map.svg'
export const OurLocationsSection = () => {
  return (
    <section className="locations" aria-label="Global Reach">
      <h2 className="locations__title">
        You can use our services anywhere in the world
      </h2>
      <p className="locations__subtitle">
        Withdraw and transfer money online through our application
      </p>
      <img
        src={locations}
        alt="Map of the world showing service availability"
        className="locations__img"
      />
    </section>
  );
}


import Section from "./Section";

const Profile = () => {
  return (
    <Section
      title="Profile"
      customClasses="order-first [--border-accent-color:var(--color-secondary)] @xl/quadrant:order-last @xl/quadrant:[--border-accent-color:var(--color-primary)]"
    >
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10"></section>
    </Section>
  );
};

export default Profile;

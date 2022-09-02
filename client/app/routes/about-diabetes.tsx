import styles from "../styles/about-diabetes.css";
import { Decoration as Decorations } from "../components";

export const links = () => [{ rel: "stylesheet", href: styles }];

const AboutDiabetes = () => {
  return (
    <>
      <div className="about-wrapper">
        <section>
          <h1>What is Diabetes?</h1>
          <p>
            Diabetes is a chronic (long-lasting) health condition that affects
            how your body turns food into energy. Most of the food you eat is
            broken down into sugar (also called glucose) and released into your
            bloodstream. When your blood sugar goes up, it signals your pancreas
            to release insulin. Insulin acts like a key to let the blood sugar
            into your body’s cells for use as energy. If you have diabetes, your
            body either doesn’t make enough insulin or can’t use the insulin it
            makes as well as it should. When there isn’t enough insulin or cells
            stop responding to insulin, too much blood sugar stays in your
            bloodstream. Over time, that can cause serious health problems, such
            as heart disease, vision loss, and kidney disease. There isn’t a
            cure yet for diabetes, but losing weight, eating healthy food, and
            being active can really help. Taking medicine as needed, getting
            diabetes self-management education and support, and keeping health
            care appointments can also reduce the impact of diabetes on your
            life.
          </p>
        </section>
        <section>
          <h1>Types of diabetes</h1>
          <ul>
            <li>
              <h3>Lorem 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
                aut! Placeat dolorum explicabo molestias voluptates eligendi
                quas quo libero laudantium est possimus ut, modi ex veniam
                necessitatibus et ipsum in? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nostrum iusto provident dicta
                deserunt saepe quam beatae esse eligendi rem, impedit, modi
                neque aliquid molestias sapiente. Dolorem unde aperiam non quam.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos
                assumenda excepturi quae facere maiores officiis ipsam?
                Veritatis corrupti dolor maiores porro sit necessitatibus eaque,
                enim quam, mollitia fugiat harum ipsa!
              </p>
            </li>
            <li>
              <h3>Lorem 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
                aut! Placeat dolorum explicabo molestias voluptates eligendi
                quas quo libero laudantium est possimus ut, modi ex veniam
                necessitatibus et ipsum in? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nostrum iusto provident dicta
                deserunt saepe quam beatae esse eligendi rem, impedit, modi
                neque aliquid molestias sapiente. Dolorem unde aperiam non quam.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos
                assumenda excepturi quae facere maiores officiis ipsam?
                Veritatis corrupti dolor maiores porro sit necessitatibus eaque,
                enim quam, mollitia fugiat harum ipsa!
              </p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default AboutDiabetes;

import React from "react";
import "./about.css";
import { Button } from "react-bootstrap";

export default function About() {
  return (
    <section className="about-container">
      <div className="about-text">About</div>
      <h2>Evangadi Networks</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
        cupiditate hic voluptate incidunt eveniet sunt voluptatibus delectus,
        consequatur ipsam error autem id impedit veritatis aspernatur quis!
        Culpa et laborum blanditiis.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
        recusandae illum, quibusdam, aliquam ipsa esse, a molestias est eos
        saepe beatae! Sunt voluptates eaque laudantium ad perferendis cumque
        doloribus error!
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum sed quia
        quod consequuntur necessitatibus ex quidem, deserunt nihil eligendi
        voluptatem amet magnam provident sapiente alias accusamus repellat
        voluptates ab velit?
      </p>
      <Button className="how-btn">HOW IT WORKS</Button>
    </section>
  );
}

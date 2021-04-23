import React from "react";

function Description() {
  return (
    <section className="description">
      <h2>Exercise:</h2>
      <ol>
        <li>
          <strong>
            As a user I want to drag colors onto a grid to fill a grid block
            with that color.
          </strong>
          <p>This includes:</p>
          <ul>
            <li>dragging the color blocks</li>
            <li>locking dragged color blocks to the grid frame when dropped</li>
            <li>filling the grid space with the dropped color</li>
            <li>
              the dragged color should not be removed from the color toolbar
            </li>
          </ul>
        </li>
        <li>
          <strong>
            As a user I want to blend a new color with an existing color on the
            grid to create a new color tone.
          </strong>
          <p>This includes:</p>
          <ul>
            <li>
              If a color is dropped on a grid space which has already been
              painted, then blend the new color with the existing color
            </li>
            <li>
              This should also be possible on already blended colors on the grid
            </li>
            <li>Alpha channel is not required for blending purposes</li>
          </ul>
        </li>
        <li>
          <strong>
            As a user I want to save my grid image to load it later.
          </strong>
          <p>This includes:</p>
          <ul>
            <li>create a JSON representation of the painted grid</li>
            <li>create a way to show the JSON</li>
            <li>
              create a function which takes a JSON and sets the grid up
              correspondingly
            </li>
            <li>provide a way to call this function with a JSON</li>
          </ul>
        </li>
      </ol>
    </section>
  );
}

export default Description;

/**
 * Shared test fixtures for ESLint rule tests
 * 
 * Reusable test data and component examples for consistent testing
 */

/**
 * Valid JSX components for testing
 */
export const validJSXComponents = {
  imageWithAlt: '<img src="test.jpg" alt="Test image" />',
  buttonWithLabel: '<button>Click me</button>',
  buttonWithAriaLabel: '<button aria-label="Close menu">×</button>',
  linkWithText: '<a href="/about">Learn more about us</a>',
  formWithLabel: '<label htmlFor="email">Email</label><input id="email" type="email" />',
  headingHierarchy: '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>',
  iframeWithTitle: '<iframe src="test.html" title="Embedded content" />',
  fieldsetWithLegend: '<fieldset><legend>Personal Information</legend><input /></fieldset>',
  tableWithCaption: '<table><caption>Data Table</caption><tr><th>Header</th></tr></table>',
  detailsWithSummary: '<details><summary>Click to expand</summary><p>Content</p></details>',
  videoWithCaptions: '<video><track kind="captions" srclang="en" label="English" /></video>',
  audioWithTrack: '<audio><track srclang="en" label="English" /></audio>',
  singleMain: '<main><h1>Main Content</h1></main>',
  sectionWithHeading: '<section><h2>Section Title</h2></section>',
  navWithAriaLabel: '<nav aria-label="Main navigation"><ul><li>Link</li></ul></nav>',
  dialogWithHeading: '<dialog><h2>Dialog Title</h2><div>Content</div></dialog>',
  dialogWithAriaLabel: '<dialog aria-label="Confirmation Dialog"><div>Content</div></dialog>'
}

/**
 * Invalid JSX components for testing violations
 */
export const invalidJSXComponents = {
  imageWithoutAlt: '<img src="test.jpg" />',
  imageWithEmptyAlt: '<img src="test.jpg" alt="" />',
  buttonWithoutLabel: '<button></button>',
  linkWithoutText: '<a href="/more">more</a>',
  formWithoutLabel: '<input type="text" />',
  headingSkipped: '<h1>Title</h1><h3>Section</h3>',
  iframeWithoutTitle: '<iframe src="test.html" />',
  iframeWithEmptyTitle: '<iframe src="test.html" title="" />',
  fieldsetWithoutLegend: '<fieldset><input /></fieldset>',
  tableWithoutCaption: '<table><tr><td>Data</td></tr></table>',
  detailsWithoutSummary: '<details><p>Content</p></details>',
  videoWithoutCaptions: '<video><source src="video.mp4" /></video>',
  audioWithoutTrack: '<audio><source src="audio.mp3" /></audio>',
  multipleMain: '<main>First</main><main>Second</main>',
  sectionWithoutName: '<section><div>Content</div></section>',
  dialogWithoutName: '<dialog><div>Content</div></dialog>',
  modalDialogWithoutAriaModal: '<dialog open><h2>Modal</h2></dialog>'
}

/**
 * Valid Vue components for testing
 */
export const validVueComponents = {
  imageWithAlt: '<template><img src="test.jpg" alt="Test image" /></template>',
  buttonWithLabel: '<template><button>Click me</button></template>',
  linkWithText: '<template><a href="/about">Learn more</a></template>',
  formWithLabel: '<template><label for="email">Email</label><input id="email" /></template>',
  iframeWithTitle: '<template><iframe src="test.html" title="Content" /></template>',
  fieldsetWithLegend: '<template><fieldset><legend>Info</legend></fieldset></template>',
  singleMain: '<template><main><h1>Content</h1></main></template>',
  sectionWithHeading: '<template><section><h2>Title</h2></section></template>',
  dialogWithHeading: '<template><dialog><h2>Title</h2></dialog></template>'
}

/**
 * Invalid Vue components for testing violations
 */
export const invalidVueComponents = {
  imageWithoutAlt: '<template><img src="test.jpg" /></template>',
  buttonWithoutLabel: '<template><button></button></template>',
  linkWithoutText: '<template><a href="/more">more</a></template>',
  formWithoutLabel: '<template><input type="text" /></template>',
  iframeWithoutTitle: '<template><iframe src="test.html" /></template>',
  fieldsetWithoutLegend: '<template><fieldset><input /></fieldset></template>',
  multipleMain: '<template><main>First</main><main>Second</main></template>',
  sectionWithoutName: '<template><section><div>Content</div></section></template>',
  dialogWithoutName: '<template><dialog><div>Content</div></dialog></template>'
}

/**
 * Valid HTML strings for testing
 */
export const validHTMLStrings = {
  imageWithAlt: 'const html = "<img src=\\"test.jpg\\" alt=\\"Test\\" />"',
  buttonWithLabel: 'const html = "<button>Click</button>"',
  linkWithText: 'const html = "<a href=\\"/about\\">Learn more</a>"',
  iframeWithTitle: 'const html = "<iframe src=\\"test.html\\" title=\\"Content\\" />"',
  singleMain: 'const html = "<main><h1>Content</h1></main>"'
}

/**
 * Invalid HTML strings for testing violations
 */
export const invalidHTMLStrings = {
  imageWithoutAlt: 'const html = "<img src=\\"test.jpg\\" />"',
  buttonWithoutLabel: 'const html = "<button></button>"',
  linkWithoutText: 'const html = "<a href=\\"/more\\">more</a>"',
  iframeWithoutTitle: 'const html = "<iframe src=\\"test.html\\" />"',
  multipleMain: 'const html = "<main>First</main><main>Second</main>"'
}

/**
 * React component examples
 */
export const reactComponents = {
  functionalComponent: `
    function MyComponent() {
      return (
        <div>
          <img src="photo.jpg" alt="A beautiful landscape" />
          <button aria-label="Close">×</button>
        </div>
      )
    }
  `,
  hooksComponent: `
    import { useState } from 'react'
    function HooksComponent() {
      const [count, setCount] = useState(0)
      return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    }
  `,
  fragmentComponent: `
    function FragmentComponent() {
      return (
        <>
          <h1>Title</h1>
          <p>Content</p>
        </>
      )
    }
  `,
  conditionalRendering: `
    function ConditionalComponent({ show }) {
      return (
        <div>
          {show && <img src="photo.jpg" alt="Photo" />}
          {!show && <p>No image</p>}
        </div>
      )
    }
  `
}

/**
 * Vue component examples
 */
export const vueComponents = {
  sfcBasic: `
    <template>
      <div>
        <img src="photo.jpg" alt="Photo" />
        <button>Click</button>
      </div>
    </template>
    <script>
    export default {
      name: 'BasicComponent'
    }
    </script>
  `,
  compositionAPI: `
    <template>
      <div>
        <button @click="increment">Count: {{ count }}</button>
      </div>
    </template>
    <script setup>
    import { ref } from 'vue'
    const count = ref(0)
    const increment = () => count.value++
    </script>
  `,
  dynamicProps: `
    <template>
      <img :src="imageUrl" :alt="imageAlt" />
    </template>
    <script>
    export default {
      props: {
        imageUrl: String,
        imageAlt: String
      }
    }
    </script>
  `,
  slots: `
    <template>
      <div>
        <slot name="header">
          <h1>Default Header</h1>
        </slot>
        <slot></slot>
      </div>
    </template>
  `
}


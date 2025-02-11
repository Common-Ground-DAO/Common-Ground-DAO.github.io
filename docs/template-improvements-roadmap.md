# Template Improvements Roadmap for Common Ground Website

This roadmap outlines the improvements planned for the Jekyll templates (_layouts, _includes, and template files) to streamline the codebase, improve maintainability, and enhance responsiveness and accessibility.

## 1. Standardizing Layouts

- **Create a Base Layout:**
  - Develop a `_layouts/base.html` that includes the core structure (html head, header, footer, main content, etc.).
  - Use Liquid's `include` and `extends` (or similar) functionality for consistency.
  - Remove duplicated markup from individual layout files.

- **Refactor Existing Layouts:**
  - Update existing layouts (e.g., `default.html`, `home.html`, `page.html`, `treasury.html`, `wiki.html`) to extend from the new base layout.
  - Ensure consistency in header, footer, and navigational sections.

## 2. Consolidating Includes

- **Unified Navigation & Header:**
  - Create or update a single `_includes/header.html` containing the site header and navigation.
  - Remove redundant header declarations from individual templates.

- **Unified Footer:**
  - Move footer markup into `_includes/footer.html` and ensure all layouts include this file.

- **Merge Similar Components:**
  - Identify and combine overlapping components such as search bars, breadcrumbs, or other repeated template elements.
  - Parameterize includes to support variations (e.g., using include variables if needed).

## 3. Removing Inline Styles and Scripts

- **Remove Inline CSS and JavaScript:**
  - Move inline `<style>` blocks from templates into appropriate CSS files.
  - Relocate inline JavaScript into external script files and trigger functionalities via data attributes and event listeners.

## 4. Improving Accessibility

- **Audit for Accessibility:**
  - Review templates for semantic HTML and ARIA roles/attributes.
  - Update navigation, forms, and interactive elements for better screen reader support.

## 5. Enhancing Consistency and Code Clean-Up

- **Adopt Naming Conventions:**
  - Decide on a naming convention (BEM, SMACSS, or another) and apply it consistently across templates and includes.
  - Remove commented-out code and ensure that duplicated code is consolidated.

- **Documentation and Comments:**
  - Add comments in templates to describe sections, particularly in the base layout and include files.
  - Maintain documentation on how templates are structured and how overrides work.

## 6. Mobile-Readiness & Responsiveness

- **Responsive Markup:**
  - Ensure that layouts are responsive by applying consistent container classes and media queries.
  - Test the layout on various devices and update templates to improve mobile navigation (e.g., off-canvas menus).

- **Template-Specific Overrides:**
  - Isolate template-specific styles (e.g., hero sections, page-specific layouts) in dedicated overrides.
  - Use CSS modules or appropriate scoping to prevent style leakage between templates.

## 7. Future Enhancements / Roadmap Items

- **Modern JavaScript Framework Consideration:**
  - Evaluate whether a modern framework (e.g., Vue.js or React) might simplify complex template behaviors in the future.
  - Explore component-based architecture for dynamic parts of the site.

- **Testing and Linting:**
  - Integrate automated tests for template rendering and unit tests for JavaScript behavior.
  - Introduce a templating linter or use tools like HTMLHint to keep the code clean.

- **Performance Optimizations:**
  - Monitor the build process for any unnecessary bloat in the generated site.
  - Consider using Jekyll plugins or build steps to optimize and minify HTML output.

---

This roadmap serves as the blueprint for our next steps in template improvement. Each step should be tackled incrementally, with testing after significant changes to ensure that the site remains functional and accessible. 
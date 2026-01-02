# ARIA Validation Scope

This document lists all ARIA roles, properties, and states that will be validated in Phase 1.

## ARIA Roles

### Supported Roles (Phase 1 - v0.8.0)

#### Widget Roles
- ✅ `button` - Button role
- ✅ `checkbox` - Checkbox role
- ✅ `radio` - Radio button role
- ✅ `switch` - Switch role
- ✅ `tab` - Tab role
- ✅ `tabpanel` - Tab panel role
- ✅ `combobox` - Combobox role
- ✅ `slider` - Slider role
- ✅ `spinbutton` - Spinbutton role
- ✅ `textbox` - Textbox role
- ✅ `searchbox` - Searchbox role
- ✅ `menuitem` - Menu item role
- ✅ `menuitemcheckbox` - Menu item checkbox role
- ✅ `menuitemradio` - Menu item radio role
- ✅ `option` - Option role
- ✅ `treeitem` - Tree item role

#### Composite Widget Roles
- ✅ `menu` - Menu role
- ✅ `menubar` - Menubar role
- ✅ `tablist` - Tab list role
- ✅ `tree` - Tree role
- ✅ `treegrid` - Treegrid role
- ✅ `grid` - Grid role
- ✅ `listbox` - Listbox role

#### Document Structure Roles
- ✅ `article` - Article role
- ✅ `section` - Section role
- ✅ `navigation` - Navigation role
- ✅ `main` - Main role
- ✅ `complementary` - Complementary (aside) role
- ✅ `contentinfo` - Content info (footer) role
- ✅ `search` - Search role
- ✅ `form` - Form role
- ✅ `region` - Region role

#### Landmark Roles
- ✅ `banner` - Banner (header) role
- ✅ `application` - Application role

#### Live Region Roles
- ✅ `alert` - Alert role
- ✅ `status` - Status role
- ✅ `log` - Log role
- ✅ `marquee` - Marquee role
- ✅ `timer` - Timer role

#### Window Roles
- ✅ `dialog` - Dialog role
- ✅ `alertdialog` - Alert dialog role

#### Abstract Roles (Not User-Facing)
- ⚠️ `command` - Abstract role (will validate but warn)
- ⚠️ `composite` - Abstract role (will validate but warn)
- ⚠️ `input` - Abstract role (will validate but warn)
- ⚠️ `landmark` - Abstract role (will validate but warn)
- ⚠️ `range` - Abstract role (will validate but warn)
- ⚠️ `roletype` - Abstract role (will validate but warn)
- ⚠️ `sectionhead` - Abstract role (will validate but warn)
- ⚠️ `select` - Abstract role (will validate but warn)
- ⚠️ `structure` - Abstract role (will validate but warn)
- ⚠️ `widget` - Abstract role (will validate but warn)
- ⚠️ `window` - Abstract role (will validate but warn)

### Not Supported in Phase 1 (Future)

#### Specialized Roles (Phase 2+)
- ❌ `cell` - Table cell role (complex table validation)
- ❌ `columnheader` - Column header role
- ❌ `row` - Row role
- ❌ `rowgroup` - Row group role
- ❌ `rowheader` - Row header role
- ❌ `separator` - Separator role (when interactive)
- ❌ `toolbar` - Toolbar role
- ❌ `tooltip` - Tooltip role
- ❌ `feed` - Feed role
- ❌ `figure` - Figure role
- ❌ `group` - Group role
- ❌ `img` - Image role
- ❌ `list` - List role
- ❌ `listitem` - List item role
- ❌ `math` - Math role
- ❌ `none` - None role
- ❌ `presentation` - Presentation role
- ❌ `note` - Note role
- ❌ `directory` - Directory role
- ❌ `term` - Term role
- ❌ `definition` - Definition role

**Total Supported in Phase 1: ~50 roles** (40 original + 10 high priority additions)  
**Total ARIA Roles: ~80 roles**

---

## ARIA Properties

### Supported Properties (Phase 1 - v0.8.0)

#### Labeling Properties
- ✅ `aria-label` - Accessible name
- ✅ `aria-labelledby` - Reference to element providing name
- ✅ `aria-describedby` - Reference to element providing description

#### Relationship Properties
- ✅ `aria-owns` - Owns relationship
- ✅ `aria-controls` - Controls relationship
- ✅ `aria-flowto` - Flow to relationship
- ✅ `aria-activedescendant` - Active descendant

#### Live Region Properties
- ✅ `aria-live` - Live region politeness
- ✅ `aria-atomic` - Atomic updates
- ✅ `aria-relevant` - Relevant changes
- ✅ `aria-busy` - Busy state

#### Drag and Drop Properties (Deprecated - Warn/Error)
- ⚠️ `aria-dropeffect` - Drop effect (Deprecated in ARIA 1.1 - warn by default, error in strict)
- ⚠️ `aria-grabbed` - Grabbed state (Deprecated in ARIA 1.1 - warn by default, error in strict)

#### Global Properties
- ✅ `aria-hidden` - Hidden from accessibility tree
- ✅ `aria-invalid` - Invalid state
- ✅ `aria-required` - Required state
- ✅ `aria-readonly` - Read-only state
- ✅ `aria-disabled` - Disabled state

#### Widget Properties
- ✅ `aria-autocomplete` - Autocomplete behavior
- ✅ `aria-checked` - Checked state (tristate)
- ✅ `aria-expanded` - Expanded state
- ✅ `aria-haspopup` - Has popup
- ✅ `aria-level` - Hierarchical level
- ✅ `aria-modal` - Modal dialog
- ✅ `aria-multiline` - Multiline textbox
- ✅ `aria-multiselectable` - Multiselectable
- ✅ `aria-orientation` - Orientation
- ✅ `aria-pressed` - Pressed state (tristate)
- ✅ `aria-selected` - Selected state
- ✅ `aria-sort` - Sort order
- ✅ `aria-valuemax` - Maximum value
- ✅ `aria-valuemin` - Minimum value
- ✅ `aria-valuenow` - Current value
- ✅ `aria-valuetext` - Value text alternative

#### Range Properties
- ✅ `aria-valuemax` - Maximum value
- ✅ `aria-valuemin` - Minimum value
- ✅ `aria-valuenow` - Current value
- ✅ `aria-valuetext` - Value text alternative

### High Priority Additions (Move to Phase 1)

#### Common Properties (Should be in Phase 1)
- ✅ `aria-current` - Current item (extremely common in navigation/tabs/steppers)
- ✅ `aria-keyshortcuts` - Keyboard shortcuts (often abused, good as warn-level)
- ✅ `aria-roledescription` - Custom role description (often abused, good as warn-level)
- ✅ `aria-posinset` - Position in set (lists/menus/tabs sometimes need)
- ✅ `aria-setsize` - Set size (lists/menus/tabs sometimes need)

### Not Supported in Phase 1 (Future)

#### Specialized Properties (Phase 2+)
- ❌ `aria-colcount` - Column count (complex tables)
- ❌ `aria-colindex` - Column index
- ❌ `aria-colspan` - Column span
- ❌ `aria-rowcount` - Row count
- ❌ `aria-rowindex` - Row index
- ❌ `aria-rowspan` - Row span
- ❌ `aria-details` - Details reference

**Total Supported in Phase 1: ~40 properties** (35 original + 5 high priority additions)  
**Total ARIA Properties: ~50 properties**

---

## ARIA States

### Supported States (Phase 1 - v0.8.0)

#### Widget States
- ✅ `aria-checked` - Checked state (true | false | mixed)
- ✅ `aria-selected` - Selected state (true | false)
- ✅ `aria-expanded` - Expanded state (true | false | undefined)
- ✅ `aria-pressed` - Pressed state (true | false | mixed)
- ✅ `aria-disabled` - Disabled state (true | false)
- ✅ `aria-readonly` - Read-only state (true | false)
- ✅ `aria-required` - Required state (true | false)
- ✅ `aria-invalid` - Invalid state (true | false | grammar | spelling)

#### Live Region States
- ✅ `aria-busy` - Busy state (true | false)

#### Global States
- ✅ `aria-hidden` - Hidden state (true | false)

### Not Supported in Phase 1 (Future)

#### Specialized States (Phase 2+)
- ❌ `aria-grabbed` - Grabbed state (true | false | undefined) - Deprecated

**Total Supported in Phase 1: ~10 states**  
**Total ARIA States: ~12 states**

---

## Validation Rules

### Role Validation Rules

#### 1. Valid Role Check
- ✅ Role exists in ARIA specification
- ✅ Role is not abstract (or warn if abstract)
- ✅ Role is not deprecated (warn for deprecated roles)
- ✅ Role is appropriate for element type

#### 2. Role-Property Relationships
- ✅ Required properties for specific roles
- ✅ Prohibited properties for specific roles
- ✅ Property combinations

#### 3. Role-Element Relationships
- ✅ Role is allowed on element type (ARIA-in-HTML conformance)
- ✅ Native element semantics vs role
- ✅ **Redundant role detection** (e.g., `<button role="button">` - warn)
- ✅ **Conflicting semantics** (e.g., role="button" on element with different strong native role)

#### 4. Role Context Rules (Required Parent/Children) ⭐ NEW
- ✅ `tab` must be owned by `tablist`
- ✅ `tabpanel` must be associated with a `tab` (via aria-labelledby or aria-controls)
- ✅ `option` must be in `listbox` (or combobox popup listbox pattern)
- ✅ `menuitem*` must be in `menu` or `menubar`
- ✅ `treeitem` must be in `tree`
- ✅ `row` must be in `grid` or `treegrid`
- ✅ Validate required owned elements
- ✅ Validate required context role

#### 5. ARIA-in-HTML Conformance ⭐ NEW
- ✅ Attributes that are technically global but discouraged/invalid on certain native elements
- ✅ Cases where native semantics should be used instead of forcing roles
- ✅ Encode authoring restrictions from ARIA in HTML spec

### Property Validation Rules

#### 1. Valid Property Check
- ✅ Property exists in ARIA specification
- ✅ Property value type is correct (boolean, tristate, idref, etc.)
- ✅ Property value is valid enum value
- ✅ **Deprecated properties** (aria-dropeffect, aria-grabbed) - warn by default, error in strict

#### 2. Property-Element Relationships
- ✅ Property is allowed on element type (ARIA-in-HTML conformance)
- ✅ Property is allowed with specific role

#### 3. Accessible Name Computation ⭐ NEW
- ✅ **aria-label="" or aria-labelledby pointing to empty text** should be an error
- ✅ **Flag "name from content" vs aria-label mismatches** for common controls (e.g., icon button has visible text "Save" but aria-label is "Close")
- ✅ **Ensure aria-label is only used when appropriate** - WCAG guidance: should be used to provide a name when a visible label isn't available
- ✅ **For dialog/alertdialog, enforce accessible name** - prefer aria-labelledby when there's a visible title
- ✅ Validate accessible name rules in a more general way (not just "has aria-label")

#### 3. ID Reference Validation (Enhanced) ⭐ UPDATED
- ✅ `aria-labelledby` references exist
- ✅ `aria-describedby` references exist
- ✅ `aria-controls` references exist
- ✅ `aria-owns` references exist
- ✅ `aria-activedescendant` references exist
- ✅ **No self-reference** (aria-labelledby="self")
- ✅ **No circular references** (circular aria-owns)
- ✅ **Referenced IDs must be unique** in the document
- ✅ **Referenced elements shouldn't be aria-hidden="true"** (makes name/description disappear for AT)
- ✅ **aria-activedescendant**: referenced element should be in same widget "scope" and owning element should be focusable

### State Validation Rules

#### 1. Valid State Check
- ✅ State value is correct type
- ✅ State value is valid enum
- ✅ State is appropriate for element/role

#### 2. State Consistency
- ✅ State combinations are valid
- ✅ **Detect obviously impossible combinations** (rather than state transitions - hard to do statically)

---

## Implementation Priority

### Phase 1.1: Core Roles + High Priority Additions (Week 1)
**Priority: High**
- button, checkbox, radio, switch
- dialog, alertdialog
- menu, menubar, menuitem
- tab, tablist, tabpanel
- **link, heading** (high frequency)
- **img** (common)
- **progressbar, meter** (common)
- **separator** (often misused)
- **toolbar, tooltip** (common)
- **none, presentation** (very common, easy to misuse)

### Phase 1.2: Common Properties + High Priority (Week 1-2)
**Priority: High**
- aria-label, aria-labelledby
- aria-describedby
- aria-hidden, aria-disabled
- aria-required, aria-invalid
- **aria-current** (extremely common)
- **aria-keyshortcuts, aria-roledescription** (often abused, warn-level)
- **aria-posinset, aria-setsize** (lists/menus/tabs)

### Phase 1.3: Relationship Properties + Enhanced Validation (Week 2)
**Priority: Medium**
- aria-controls
- aria-owns
- aria-activedescendant
- **Enhanced ID reference validation** (no self-ref, no circular, unique IDs, not aria-hidden)
- **Role context rules** (required parent/children)

### Phase 1.4: Widget States (Week 2)
**Priority: Medium**
- aria-checked, aria-selected
- aria-expanded, aria-pressed

### Phase 1.5: Accessible Name Computation (Week 2-3) ⭐ NEW
**Priority: High**
- Validate empty aria-label/aria-labelledby
- Flag name from content vs aria-label mismatches
- Ensure aria-label is used appropriately
- Dialog/alertdialog accessible name enforcement

### Phase 1.6: ARIA-in-HTML Conformance + Redundant Roles (Week 3) ⭐ NEW
**Priority: High**
- ARIA-in-HTML authoring restrictions
- Redundant role detection
- Conflicting semantics detection

### Phase 1.7: Composite Pattern Validator (Week 3) ⭐ NEW
**Priority: High**
- Validates required parent/child roles
- Validates required linking attributes (aria-controls, aria-labelledby) for patterns
- Validates focusability + keyboard affordances for non-native elements

### Phase 1.8: Remaining Roles (Week 3)
**Priority: Medium**
- All document structure roles
- All landmark roles
- All live region roles

### Phase 1.9: Remaining Properties (Week 3)
**Priority: Low**
- All widget properties
- All range properties
- All live region properties

---

## Validation Examples

### Valid Examples
```html
<!-- Valid role on button -->
<button role="button">Click me</button>

<!-- Valid role with required property -->
<div role="dialog" aria-label="Confirmation">Content</div>

<!-- Valid property value -->
<input aria-required="true" />

<!-- Valid ID reference -->
<input aria-labelledby="email-label" />
<label id="email-label">Email</label>
```

### Invalid Examples
```html
<!-- Invalid role -->
<div role="invalid-role">Content</div>

<!-- Role on wrong element -->
<img role="button" />

<!-- Missing required property -->
<div role="dialog">Content</div> <!-- Missing aria-label or aria-labelledby -->

<!-- Invalid property value -->
<input aria-required="maybe" /> <!-- Should be "true" or "false" -->

<!-- Invalid ID reference -->
<input aria-labelledby="missing-id" /> <!-- ID doesn't exist -->
```

---

## Success Criteria

- ✅ All 50+ common ARIA roles validated (including high priority additions)
- ✅ All 40+ common ARIA properties validated (including high priority additions)
- ✅ All ID references validated (with enhanced checks)
- ✅ Role-property relationships validated
- ✅ Role-element relationships validated (ARIA-in-HTML conformance)
- ✅ **Role context rules validated** (required parent/children)
- ✅ **Accessible name computation validated**
- ✅ **Redundant/conflicting role detection**
- ✅ **Composite pattern validation**
- ✅ ESLint rule working for JSX, Vue, HTML
- ✅ 90%+ test coverage
- ✅ Documentation complete

---

## Future Enhancements (Phase 2+)

- Complex table roles (cell, rowheader, columnheader)
- Grid roles and properties
- ARIA 1.3 features (when available)
- Custom role descriptions
- Keyboard shortcut validation
- Position in set validation


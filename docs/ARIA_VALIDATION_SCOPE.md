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

**Total Supported in Phase 1: ~40 roles**  
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

#### Drag and Drop Properties
- ✅ `aria-dropeffect` - Drop effect
- ✅ `aria-grabbed` - Grabbed state

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

### Not Supported in Phase 1 (Future)

#### Specialized Properties (Phase 2+)
- ❌ `aria-colcount` - Column count (complex tables)
- ❌ `aria-colindex` - Column index
- ❌ `aria-colspan` - Column span
- ❌ `aria-rowcount` - Row count
- ❌ `aria-rowindex` - Row index
- ❌ `aria-rowspan` - Row span
- ❌ `aria-keyshortcuts` - Keyboard shortcuts
- ❌ `aria-roledescription` - Custom role description
- ❌ `aria-current` - Current item
- ❌ `aria-posinset` - Position in set
- ❌ `aria-setsize` - Set size
- ❌ `aria-details` - Details reference

**Total Supported in Phase 1: ~35 properties**  
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
- ❌ `aria-current` - Current item state (page | step | location | date | time | true | false)
- ❌ `aria-grabbed` - Grabbed state (true | false | undefined)

**Total Supported in Phase 1: ~10 states**  
**Total ARIA States: ~12 states**

---

## Validation Rules

### Role Validation Rules

#### 1. Valid Role Check
- ✅ Role exists in ARIA specification
- ✅ Role is not abstract (or warn if abstract)
- ✅ Role is appropriate for element type

#### 2. Role-Property Relationships
- ✅ Required properties for specific roles
- ✅ Prohibited properties for specific roles
- ✅ Property combinations

#### 3. Role-Element Relationships
- ✅ Role is allowed on element type
- ✅ Native element semantics vs role
- ✅ Redundant role warnings

### Property Validation Rules

#### 1. Valid Property Check
- ✅ Property exists in ARIA specification
- ✅ Property value type is correct (boolean, tristate, idref, etc.)
- ✅ Property value is valid enum value

#### 2. Property-Element Relationships
- ✅ Property is allowed on element type
- ✅ Property is allowed with specific role

#### 3. ID Reference Validation
- ✅ `aria-labelledby` references exist
- ✅ `aria-describedby` references exist
- ✅ `aria-controls` references exist
- ✅ `aria-owns` references exist
- ✅ `aria-activedescendant` references exist

### State Validation Rules

#### 1. Valid State Check
- ✅ State value is correct type
- ✅ State value is valid enum
- ✅ State is appropriate for element/role

#### 2. State Consistency
- ✅ State combinations are valid
- ✅ State transitions are logical

---

## Implementation Priority

### Phase 1.1: Core Roles (Week 1)
**Priority: High**
- button, checkbox, radio, switch
- dialog, alertdialog
- menu, menubar, menuitem
- tab, tablist, tabpanel

### Phase 1.2: Common Properties (Week 1-2)
**Priority: High**
- aria-label, aria-labelledby
- aria-describedby
- aria-hidden, aria-disabled
- aria-required, aria-invalid

### Phase 1.3: Relationship Properties (Week 2)
**Priority: Medium**
- aria-controls
- aria-owns
- aria-activedescendant

### Phase 1.4: Widget States (Week 2)
**Priority: Medium**
- aria-checked, aria-selected
- aria-expanded, aria-pressed

### Phase 1.5: Remaining Roles (Week 2-3)
**Priority: Medium**
- All document structure roles
- All landmark roles
- All live region roles

### Phase 1.6: Remaining Properties (Week 3)
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

- ✅ All 40+ common ARIA roles validated
- ✅ All 35+ common ARIA properties validated
- ✅ All ID references validated
- ✅ Role-property relationships validated
- ✅ Role-element relationships validated
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


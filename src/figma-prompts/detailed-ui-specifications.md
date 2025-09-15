# Figma AI Ultra-Detailed Prompt – Complete UI/UX Specifications

## Core System Prompt

> Design a **comprehensive, clean UI/UX system** for an **AI-Based Farmer Query Support and Advisory System ("Digital Krishi Officer")** with **precise iconography, proper spacing, and role-based layouts**. Create **three distinct dashboard experiences** with **Malayalam/English bilingual support** and **no overlapping elements**.

---

## 🏗️ SYSTEM ARCHITECTURE

### **Header Component** (All Roles)
- **Logo**: Circle with "DKO" text in primary color
- **Title**: "Digital Krishi Officer" / "ഡിജിറ്റൽ കൃഷി ഓഫീസർ"
- **Controls**: 
  - Language toggle (🌐 globe icon)
  - Dark/Light mode (☀️ sun / 🌙 moon icons)
  - Logout button (🚪 door/exit icon)

### **Sidebar Profile Section** (280px width)
- **Avatar**: User profile circle with default farmer/officer/admin icons
- **Role Badge**: Color-coded badges (Green: Farmer, Blue: Officer, Purple: Admin)
- **Location Info**: 📍 pin icon + district/panchayat
- **Stats Cards**: Mini cards with icons (🌱 crops, 📏 land size, ⏳ experience)

---

## 📱 NAVIGATION TABS SYSTEM

### **Farmer Navigation (6 tabs)**
```
🏠 Dashboard | 💬 Query | 📚 Knowledge | ⚠️ Escalation | 💰 Subsidiary | 👤 Profile
```

### **Officer Navigation (7 tabs)**
```
🏠 Dashboard | 💬 Query | 📚 Knowledge | ⚠️ Escalation | 📊 Analytics | 💰 Subsidiary | 👤 Profile
```

### **Admin Navigation (7 tabs)**
```
🏠 Dashboard | 💬 Query | 📚 Knowledge | ⚠️ Escalation | 📊 Analytics | 💰 Subsidiary | 👤 Profile
```

---

## 🎯 COMPONENT-SPECIFIC DESIGNS

### **1. DASHBOARD TAB**

#### **Farmer Dashboard Cards:**
- **Quick Query Card**: 💬 chat bubble + "Ask AI Assistant" button
- **Recent Activity**: 📈 activity icon + timeline list
- **Weather Widget**: 🌤️ weather icon + temperature/conditions
- **Crop Calendar**: 📅 calendar icon + seasonal crop suggestions
- **Escalation Status**: ⚠️ warning triangle + pending/resolved counts

#### **Officer/Admin Dashboard Cards:**
- **Assignment Queue**: 📋 clipboard + pending escalation count with red badge
- **Performance Metrics**: 📊 bar chart + resolution rate percentages
- **District Overview**: 🗺️ map icon + geographical coverage stats
- **Alert Center**: 🚨 alert bell + urgent notifications panel

### **2. QUERY TAB**

#### **Left Panel - Query Input:**
- **Text Query Section**:
  - 💬 Chat icon + "Type your question" input field
  - 🎤 Microphone icon for voice input
  - 📷 Camera icon for image upload
  - ✉️ Send button (arrow in circle)

- **Query Type Selector**:
  - 🌱 **Crop Issues** (leaf with disease spots icon)
  - 🧪 **Input & Advisory** (fertilizer/chemical bottle icon)
  - 💼 **Schemes & Market** (document/briefcase icon)

#### **Right Panel - Chat Interface:**
- **AI Avatar**: 🤖 Robot head icon
- **User Avatar**: 👤 Person icon
- **Message Bubbles**: Rounded corners, proper spacing
- **Confidence Indicator**: Progress bar (80-100%) with 📊 icon
- **Source Links**: 🔗 Chain link icons
- **Feedback Buttons**: 👍 thumbs up / 👎 thumbs down

### **3. KNOWLEDGE BASE TAB**

#### **Categories Grid (4 columns):**
- **🌾 Crop Management** (wheat/rice stalks icon)
- **🐛 Pest Control** (bug/insect icon with slash)
- **🌧️ Weather Guidance** (cloud with rain icon)
- **💰 Financial Schemes** (money/coins stack icon)
- **🚜 Equipment** (tractor icon)
- **🌱 Organic Farming** (organic leaf/certificate icon)
- **📈 Market Prices** (trending up graph icon)
- **🎓 Training** (graduation cap icon)

#### **Search & Filter:**
- **Search Bar**: 🔍 magnifying glass + "Search knowledge base"
- **Filter Dropdown**: ⚙️ filter icon + category selector
- **Sort Options**: ↕️ sort arrows + date/relevance options

### **4. ESCALATION TAB**

#### **Three-Column Layout:**

**Column 1 - Create Escalation:**
- **Issue Category Cards**:
  - 🌱 **Crop Issues** (diseased plant icon + red accent)
  - 🧪 **Input & Advisory** (fertilizer bottle + blue accent) 
  - 💼 **Schemes & Market** (document folder + green accent)
- **Priority Selector**: 🔴 High / 🟡 Medium / 🟢 Low (colored circles)
- **Attachment**: 📎 paperclip icon + "Add photos/documents"

**Column 2 - My Escalations (Farmer) / Assigned (Officer/Admin):**
- **Status Badges**: 
  - 🟡 Pending (yellow circle)
  - 🔵 In Progress (blue circle with clock)
  - 🟢 Resolved (green checkmark circle)
- **Officer Avatar**: 👨‍🌾 Agricultural officer icon
- **Date Stamps**: 📅 calendar icon + timestamps

**Column 3 - Escalation Details:**
- **Issue Description**: 📝 document icon + text content
- **Attached Media**: 📷 camera grid for images
- **Officer Notes**: 💬 speech bubble with notes
- **Resolution Steps**: ✅ checklist with completion status

#### **Officer/Admin Additional Features:**
- **Assignment Panel**: 🎯 target icon + officer dropdown
- **Bulk Actions**: ☑️ checkbox selector + action buttons
- **Priority Sort**: 🔥 fire icon for urgent items

### **5. ANALYTICS TAB** (Officer/Admin Only)

#### **Dashboard Metrics (4 cards):**
- **📊 Total Queries**: Bar chart icon + number counter
- **⚡ Resolution Rate**: Lightning bolt + percentage
- **⏱️ Average Response Time**: Clock icon + hours/minutes
- **😊 Satisfaction Score**: Star rating + percentage

#### **Charts Section:**
- **📈 Query Trends**: Line graph (monthly trends)
- **🥧 Query Categories**: Pie chart (crop issues, advisory, schemes)
- **🗺️ Geographic Heatmap**: Map with color intensity by district
- **📋 Officer Performance**: Horizontal bar chart with officer names

#### **Filters Panel:**
- **📅 Date Range**: Calendar picker with from/to dates
- **🏘️ District Filter**: Dropdown with checkboxes
- **👨‍🌾 Officer Filter**: Multi-select dropdown with avatars
- **📊 Export Options**: ⬇️ download icon + CSV/PDF buttons

### **6. SUBSIDIARY PLANS TAB**

#### **Plans Overview (Card Grid):**
- **🌾 PM-KISAN**: Farmer icon + ₹ rupee symbol
- **🌱 Soil Health Card**: Soil/earth icon + health checkmark
- **🚜 Equipment Subsidy**: Tractor icon + discount tag
- **🐄 Livestock Support**: Cow icon + heart symbol
- **💧 Irrigation Schemes**: Water drop + pipeline icon
- **📚 Training Programs**: Book icon + graduation cap

#### **Plan Details Panel:**
- **Eligibility Checklist**: ✅ checkmark list with criteria
- **Required Documents**: 📄 document stack with numbered list
- **Application Status**: 🚦 Traffic light system (red/yellow/green)
- **Timeline**: 📅 Calendar with milestone markers
- **Contact Info**: 📞 phone icon + officer details

#### **Application Tracker:**
- **Step Indicator**: Numbered circles (1→2→3→4) with connecting lines
- **Status Icons**: ⏳ pending / 🔄 processing / ✅ approved / ❌ rejected
- **Action Buttons**: 📝 edit / 👁️ view / 📤 submit buttons

### **7. PROFILE TAB**

#### **Farmer Profile Sections:**
- **Personal Info**: 👤 person icon + editable fields
- **Farm Details**: 🏡 house icon + land size, crops, location
- **Contact Info**: 📞 phone + ✉️ email icons
- **Preferences**: ⚙️ gear icon + language, notifications
- **Achievement Badges**: 🏆 trophy icons for milestones

#### **Officer/Admin Profile:**
- **Official Info**: 🎖️ badge icon + designation, department
- **Coverage Area**: 🗺️ map with highlighted regions  
- **Performance Stats**: 📊 charts with resolution metrics
- **Certifications**: 🎓 certificate icons with validity dates

---

## 🎨 DESIGN SYSTEM SPECIFICATIONS

### **Color Coding:**
- **Primary Actions**: #030213 (dark blue)
- **Success States**: #22c55e (green)
- **Warning States**: #f59e0b (amber)
- **Error States**: #ef4444 (red)
- **Info States**: #3b82f6 (blue)

### **Card Layouts:**
- **Spacing**: 24px between cards, 16px internal padding
- **Shadows**: Subtle drop shadow (0 1px 3px rgba(0,0,0,0.1))
- **Corners**: 10px border radius
- **Hover States**: Gentle scale (1.02) + shadow increase

### **Typography:**
- **Headers**: Malayalam: Noto Sans Malayalam / English: System fonts
- **Sizes**: H1(24px), H2(20px), H3(18px), Body(16px)
- **Weights**: Headings(500), Body(400)

### **Responsive Breakpoints:**
- **Mobile**: Stack cards vertically, collapsible sidebar
- **Tablet**: 2-column grid, condensed navigation
- **Desktop**: Full 3+ column layouts, expanded sidebar

### **Interactive Elements:**
- **Buttons**: Minimum 44px height, clear focus states
- **Form Fields**: 48px height, proper contrast, clear labels
- **Touch Targets**: Minimum 44x44px for mobile compatibility

---

## 📱 MOBILE RESPONSIVE ADAPTATIONS

### **Navigation:**
- Convert tabs to hamburger menu (☰) with slide-out drawer
- Profile section collapses to header avatar
- Search becomes full-width modal overlay

### **Cards & Layout:**
- Single column stack on mobile
- Expandable sections with accordion behavior
- Swipe gestures for tab navigation

### **Input Methods:**
- Voice input prominent on mobile
- Camera integration for image queries
- Touch-optimized form elements

---

## 🔧 SPECIAL FEATURES

### **AI Assistant Visual Cues:**
- **Thinking State**: Animated dots (⋯) with pulsing effect
- **Confidence Meter**: Progress bar with color gradient (red→yellow→green)
- **Source Attribution**: Small 🔗 link icons next to AI responses

### **Escalation Workflow:**
- **Drag & Drop**: Officer assignment with visual feedback
- **Status Timeline**: Vertical timeline with icons and timestamps
- **Notification Badges**: Red circles with numbers on relevant tabs

### **Multilingual Support:**
- **Script Direction**: Proper RTL/LTR support for Malayalam/English
- **Font Fallbacks**: Web-safe Malayalam font stacks
- **Icon Consistency**: Same icons work across both languages

---

## 📋 DELIVERABLE CHECKLIST

✅ **Three complete dashboards** (Farmer, Officer, Admin)
✅ **All 6-7 tab layouts** with proper spacing and no overlaps
✅ **Consistent iconography** throughout all components
✅ **Bilingual labels** for all UI elements
✅ **Mobile and desktop layouts** with responsive behavior
✅ **Interactive states** (hover, active, disabled)
✅ **Color-coded elements** for different functionalities
✅ **Proper typography hierarchy** and spacing
✅ **Role-based feature visibility** clearly differentiated

This prompt will generate a comprehensive, professional UI/UX system that matches your sophisticated application architecture!
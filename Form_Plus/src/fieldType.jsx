import {
  AlignJustify,
  AtSign,
  CalendarDays,
  Check,
  ChevronDown,
  Circle,
  FolderClosed,
  Hash,
  Type,
} from "lucide-react";

const data = [
  {
    icon: <Type />,
    text: "Text",
    value: "text",
  },
  {
    icon: <AlignJustify />,
    text: "Paragraph",
    value: "textarea",
  },
  {
    icon: <AtSign />,
    text: "Email",
    value: "email",
  },
  {
    icon: <Hash />,
    text: "Number",
    value: "number",
  },
  {
    icon: <FolderClosed />,
    text: "File",
    value: "file",
  },
  {
    icon: <CalendarDays />,
    text: "Date",
    value: "date",
  },
  {
    icon: <ChevronDown />,
    text: "Dropdown",
    value: "dropdown",
  },
  {
    icon: <Check />,
    text: "Checkbox",
    value: "checkbox",
  },
  {
    icon: <Circle />,
    text: "Radio",
    value: "radio",
  },
];
export default data;

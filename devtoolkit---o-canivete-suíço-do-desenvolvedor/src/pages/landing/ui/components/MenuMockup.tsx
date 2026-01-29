import { Wrench } from "lucide-react";
import {
  LogoContainer,
  LogoIcon,
  LogoText,
  MenuGroup,
  MenuItem,
  MenuItemText,
} from "../LaptopMockup.styles";
//mockup menu
const menuItems = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Tools", icon: "tools" },
  { label: "Settings", icon: "settings" },
];
const MenuMockup: React.FC = () => {
  return (
    <>
      <LogoContainer>
        <LogoIcon>
          <Wrench size={12} color="white" />
        </LogoIcon>
        <LogoText>DevToolkit</LogoText>
      </LogoContainer>
      <MenuGroup>
        {menuItems.map((item, index) => (
          <MenuItem key={item.label} $active={index === 0}>
            <MenuItemText $active={index === 0}>{item.label}</MenuItemText>
          </MenuItem>
        ))}
      </MenuGroup>
    </>
  );
};

export default MenuMockup;

import { Center, Container, NavLink } from "@mantine/core";
import { IconHome2 } from "@tabler/icons-react";

export function Menu()
{
    return (
        <Center>
            <Container>
                <NavLink
                    href="/"
                    label="Home"
                    leftSection={<IconHome2 size={18} stroke={1.5} />}
                />
            </Container>
        </Center>
    );
}
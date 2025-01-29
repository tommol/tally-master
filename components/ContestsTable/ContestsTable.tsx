'use client';
import React, {useState} from 'react';
import {ActionIcon, Menu, Text, Table, useMantineTheme} from '@mantine/core';
import {
    IconCalendar, IconChartBar, IconDeviceMobilePlus,
    IconEye,
    IconFileLike,
    IconMenu, IconPlayerPlay, IconReorder,
    IconSquareCheck,
    IconUserPlus,
    IconUsers,
    IconUsersPlus
} from "@tabler/icons-react";
import Link from "next/link";

export type ContestInfoListItem =
    {
        id: string;
        name: string;
        year: string;
    }

export interface ContestsTableProps {
    data: ContestInfoListItem[];
}

export function ContestTable({data}: ContestsTableProps) {
    const [scrolled, setScrolled] = useState(false);
    const theme = useMantineTheme();
    const rows = data.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.year}</Table.Td>
            <Table.Td>
                <Menu
                    transitionProps={{ transition: 'pop-top-right' }}
                    position="right-start"
                    width={220}
                    withinPortal
                >
                    <Menu.Target>
                        <ActionIcon variant="subtle" aria-label="Settings" color="gray">
                            <IconMenu />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            component={Link}
                            href={`/contests/${row.id}`}
                            leftSection={<IconEye size={16}  stroke={1.5} />}
                        >
                            View
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconUserPlus size={16}  stroke={1.5} />}

                        >
                            Add Contestant
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconUsersPlus size={16} stroke={1.5} />}
                        >
                            Add Judge
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            leftSection={<IconPlayerPlay size={16} stroke={1.5} />}
                        >
                            Start Online Voting
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconReorder size={16} stroke={1.5} />}
                        >
                            Add Jury Votes
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconFileLike size={16} stroke={1.5} />}
                        >
                            Add Audience Votes
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item component={Link} href={`/contests/${row.id}/results`}
                            leftSection={<IconChartBar size={16} stroke={1.5} />}
                        >
                            Results
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table miw={700}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Year</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}
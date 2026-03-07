import { render, screen, fireEvent } from "@testing-library/react";
import UserLists from "./UserLists";
import { deleteUser } from "@/app/actions/admin/adminActions";

// Creating the mock data
jest.mock("@/app/actions/admin/adminActions", () => ({
  deleteUser: jest.fn(),
}));

jest.mock("./UpdateUser", () => {
  return function MockUpdateUser({
    student,
  }: {
    student: { full_name: string };
  }) {
    return <div data-testid="update-user">{student.full_name}</div>;
  };
});

// Test users
const mockStudents = [
  {
    id: "1",
    email: "bertil@test.com",
    full_name: "Bertil Johnsson",
    phone: "123",
    bio: "test",
    role: "student",
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
  },
  {
    id: "2",
    email: "dimitris@test.com",
    full_name: "Dimitris Emmanouil",
    phone: "456",
    bio: "test",
    role: "student",
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
  },
];

// Tests
describe("UserLists", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1:
  it("all names should be rendered", () => {
    render(<UserLists students={mockStudents} />);

    expect(screen.getByText("Bertil Johnsson")).toBeInTheDocument();
    expect(screen.getByText("Dimitris Emmanouil")).toBeInTheDocument();
  });

  // Test 2:
  it("call correct id when clicking on delete button", () => {
    const { container } = render(<UserLists students={mockStudents} />);

    const trashIcons = container.querySelectorAll(".text-red-600");

    fireEvent.click(trashIcons[0]);
    expect(deleteUser).toHaveBeenCalledWith("1");

    fireEvent.click(trashIcons[1]);
    expect(deleteUser).toHaveBeenCalledWith("2");
  });

  // Test 3:
  it("does the modal opens when user clicks on update button", () => {
    const { container } = render(<UserLists students={mockStudents} />);

    expect(screen.queryByTestId("update-user")).not.toBeInTheDocument();

    // can be change to getElementById if code gets more complicated
    const updateIcons = container.querySelectorAll(".text-yellow-400");
    fireEvent.click(updateIcons[0]);

    expect(screen.getByTestId("update-user")).toHaveTextContent(
      "Bertil Johnsson",
    );
  });

  // Test 4:
  it("does the modal close when clicking on icon", () => {
    const { container } = render(<UserLists students={mockStudents} />);

    const updateIcons = container.querySelectorAll(".text-yellow-400");
    fireEvent.click(updateIcons[0]);
    expect(screen.getByTestId("update-user")).toBeInTheDocument();

    fireEvent.click(screen.getByText("✕"));

    expect(screen.queryByTestId("update-user")).not.toBeInTheDocument();
  });
});

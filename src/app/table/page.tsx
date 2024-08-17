import React from "react";

/**
 * 
 * so then when requesting a protected route, the jwt is sent.
 * Or when accessing a protected page, the jwt is sent? 
 * So I want to access my dashboard, and I'd need to be signed in.
 * SO the JWT is persitent auth.
 * Different thing.
 * 'Otherwise a session or something is saved and used to validate.
 * The session thing is next.
 */

const Page: React.FC = () => {
  return (
    <div>
      <table>
        <thead>
          <th>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
        </tbody>
      </table>
      {/* Add your content here */}
    </div>
  );
};

export default Page;

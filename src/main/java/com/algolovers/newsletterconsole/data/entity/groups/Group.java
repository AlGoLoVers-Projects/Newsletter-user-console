package com.algolovers.newsletterconsole.data.entity.groups;

import com.algolovers.newsletterconsole.data.entity.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "newsletter_group")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    @Pattern(regexp = "^[a-zA-Z0-9_ ]*$", message = "Username can only contain alphanumeric characters and underscores")
    @Size(min = 3, max = 30, message = "Username must have a minimum of three characters and maximum of 30 characters")
    String groupName;

    @Column(nullable = false)
    String groupDescription;

    @ManyToOne
    @JoinColumn(name = "group_owner_id", nullable = false)
    private User groupOwner;

    @OneToMany
    private Set<GroupMember> groupMembers;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    //TODO: Add questions. Questions -> List<Questions> it can be edited modified bla bla.
    //Monthly responses should be maintained somewhere
    //private List<Questions> questions;

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", groupName='" + groupName + '\'' +
                ", groupDescription='" + groupDescription + '\'' +
                ", groupOwner='" + groupOwner + '\'' +
                '}';
    }

}

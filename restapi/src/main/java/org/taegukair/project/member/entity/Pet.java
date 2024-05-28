package org.taegukair.project.member.entity;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "pet")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int petId;

    @ManyToOne
    @JoinColumn(name = "member", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String petName;

    @Column(nullable = false)
    private String species;

    @Column(nullable = false)
    private String breed;

    @Column
    private byte[] image;

    public Pet() {
    }

    public Pet(int petId, Member member, String petName, String species, String breed, byte[] image) {
        this.petId = petId;
        this.member = member;
        this.petName = petName;
        this.species = species;
        this.breed = breed;
        this.image = image;
    }

    public int getPetId() {
        return petId;
    }

    public void setPetId(int petId) {
        this.petId = petId;
    }

    public Member getUser() {
        return member;
    }

    public void setUser(Member member) {
        this.member = member;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Pet{" +
                "petId=" + petId +
                ", user=" + user +
                ", petName='" + petName + '\'' +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}